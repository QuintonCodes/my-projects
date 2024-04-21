const router = require("express").Router();
const spotifyApi = require("../utils/spotifyClient");

// Login route
router.get("/login", (req, res) => {
  var authorizeURL = spotifyApi.createAuthorizeURL(["user-follow-read"]);
  res.redirect(authorizeURL);
});

// Callback route
router.get("/callback", async (req, res) => {
  try {
    const data = await spotifyApi.authorizationCodeGrant(req.query.code);
    req.session.token_info = {
      access_token: data.body["access_token"],
      refresh_token: data.body["refresh_token"],
      expires_in: Date.now() + 10800000,
    };

    console.log("Token info set in session:", req.session.token_info);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);
    spotifyApi.setRefreshToken(data.body["refresh_token"]);

    res.redirect("/artists/get_followed_artists");
  } catch (error) {
    console.error("Error during callback token handling:", error);
    res.status(401).send("Failed to get token");
  }
});

module.exports = router;
