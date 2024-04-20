const router = require("express").Router();
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

function ensureAuthenticated(req, res, next) {
  if (!req.session.token_info) {
    return res.redirect("/auth/login");
  }
  spotifyApi.setAccessToken(req.session.token_info.access_token);
  next();
}

// Get followed artists
router.get("/get_followed_artists", ensureAuthenticated, async (req, res) => {
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
    res.json(
      paginatedArtists.map((artist) => ({
        name: artist.name,
        image: artist.images[0] ? artist.images[0].url : null,
      }))
    );
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

// Get artist of the day
router.get("/get_random_artist", ensureAuthenticated, async (req, res) => {
  try {
    const data = await spotifyApi.getFollowedArtists({ limit: 50 });
    if (data.body.artists.items.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * data.body.artists.items.length
      );
      const randomArtist = data.body.artists.items[randomIndex];
      res.json({
        name: randomArtist.name,
        image: randomArtist.images[0] ? randomArtist.images[0].url : null,
      });
    } else {
      res.status(404).send("No followed artists found");
    }
  } catch (error) {
    console.error("Failed to fetch artists:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch artists", message: error.message });
  }
});

module.exports = router;
