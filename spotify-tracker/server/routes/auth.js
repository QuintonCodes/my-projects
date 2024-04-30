const router = require("express").Router();
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = require("../utils/spotifyClient");
const UserToken = require("../models/UserToken");

// Login route
router.get("/login", (req, res) => {
  var authorizeURL = spotifyApi.createAuthorizeURL([
    "user-follow-read",
    "user-read-private",
  ]);
  res.redirect(authorizeURL);
});

// Profile route
router.get("/profile", async (req, res) => {
  if (!req.session.token_info || !req.session.token_info.access_token) {
    return res.status(401).send("Unauthorized: No session available");
  }

  try {
    const localSpotifyApi = new SpotifyWebApi();
    localSpotifyApi.setAccessToken(req.session.token_info.access_token);
    const me = await localSpotifyApi.getMe();
    const profile = {
      display_name: me.body.display_name,
      id: me.body.id,
      image: me.body.images[0] ? me.body.images[0].url : null,
    };
    res.json(profile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    if (error.statusCode === 401) {
      // handle expired access token
      console.log("Access token expired, attempting to refresh...");
      try {
        const data = await spotifyApi.refreshAccessToken();
        spotifyApi.setAccessToken(data.body["access_token"]);
        req.session.token_info.access_token = data.body["access_token"];

        const refreshedMe = await spotifyApi.getMe();
        const refreshedProfile = {
          display_name: refreshedMe.body.display_name,
          id: refreshedMe.body.id,
          image: refreshedMe.body.images[0]
            ? refreshedMe.body.images[0].url
            : null,
        };
        res.json(refreshedProfile);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        res.status(500).send("Failed to refresh token and fetch user profile");
      }
    } else {
      res.status(500).send("Failed to fetch user profile");
    }
  }
});

// Callback route
router.get("/callback", async (req, res) => {
  console.log("Authorization code:", req.query.code); // Check if code is received
  if (!req.query.code) {
    return res.status(400).send("Authorization code is missing");
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(req.query.code);
    req.session.token_info = {
      access_token: data.body["access_token"],
      refresh_token: data.body["refresh_token"],
      expires_in: Date.now() + data.body["expires_in"] * 1000,
    };

    const userToken = new UserToken({
      accessToken: data.body["access_token"],
      refreshToken: data.body["refresh_token"],
      expiresIn: new Date(Date.now() + data.body["expires_in"] * 1000),
    });

    await userToken.save();
    console.log("User token saved:", userToken);

    console.log("Token info set in session:", req.session.token_info);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);
    spotifyApi.setRefreshToken(data.body["refresh_token"]);

    res.send(`<html><script>window.close();</script></html>`);
  } catch (error) {
    console.error("Error during callback token handling:", error);
    res.status(401).send("Failed to get token" + error.message);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to sign out");
    }
    res.send("Signed out successfully");
  });
});

module.exports = router;
