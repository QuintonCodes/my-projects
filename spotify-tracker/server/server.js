const express = require("express");
const session = require("express-session");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

// Homepage route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Login route
app.get("/login", (req, res) => {
  var authorizeURL = spotifyApi.createAuthorizeURL(["user-follow-read"]);
  res.redirect(authorizeURL);
});

// Callback route
app.get("/callback", async (req, res) => {
  try {
    const data = await spotifyApi.authorizationCodeGrant(req.query.code);
    req.session.token_info = {
      access_token: data.body["access_token"],
      refresh_token: data.body["refresh_token"],
      expires_in: data.body["expires_in"],
    };

    console.log("Token info set in session:", req.session.token_info);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);
    spotifyApi.setRefreshToken(data.body["refresh_token"]);

    res.redirect("/get_followed_artists");
  } catch (error) {
    console.log("Error during callback token handling:", error);
    res.status(401).send("Failed to get token");
  }
});

app.get("/get_followed_artists", async (req, res) => {
  if (!req.session.token_info) {
    return res.redirect("/login");
  }

  spotifyApi.setAccessToken(req.session.token_info.access_token);

  try {
    if (!req.session.full_artist_list) {
      const data = await spotifyApi.getFollowedArtists({ limit: 50 });
      // Randomize the order
      req.session.full_artist_list = data.body.artists.items
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    }

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const paginatedArtists = req.session.full_artist_list.slice(
      offset,
      offset + limit
    );
    const data = await spotifyApi.getFollowedArtists({ limit, offset });
    const artists = paginatedArtists.map((artist) => ({
      name: artist.name,
      image: artist.images[0] ? artist.images[0].url : null,
    }));
    res.json(artists);
  } catch (error) {
    console.error("Failed to fetch artists:", error);
    if (error.statusCode === 401) {
      // Handle token expiration etc.
      res.status(401).send("Authentication required.");
    } else {
      res
        .status(500)
        .json({ error: "Failed to fetch artists", message: error });
    }
  }
});

app.get("/get_random_artist", async (req, res) => {
  if (!req.session.token_info) {
    return res.redirect("/login");
  }

  spotifyApi.setAccessToken(req.session.token_info.access_token);

  try {
    const data = await spotifyApi.getFollowedArtists({ limit: 50 });
    if (data.body.artists.items.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * data.body.artists.items.length
      );
      const randomArtist = data.body.artists.items[randomIndex];
      const artistImage = randomArtist.images[0]
        ? randomArtist.images[0].url
        : null;
      res.json({ name: randomArtist.name, image: artistImage });
    } else {
      res.status(404).send("No followed artists found");
    }
  } catch (error) {
    console.error("Failed to fetch artists:", error);
    res.status(500).json({ error: "Failed to fetch artists", message: error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
