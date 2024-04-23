const router = require("express").Router();
const spotifyApi = require("../utils/spotifyClient");

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
    spotifyApi.setAccessToken(req.session.token_info.access_token);
    const me = await spotifyApi.getMe();
    res.json(me.body);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    if (error.statusCode === 401) {
      // handle expired access token
      console.log("Access token expired, attempting to refresh...");
      const data = await spotifyApi.refreshAccessToken();
      spotifyApi.setAccessToken(data.body["access_token"]);
      req.session.token_info.access_token = data.body["access_token"];
      // Retry fetching profile after refreshing token
      return router.get("/profile");
    } else {
      res.status(500).send("Failed to fetch user profile");
    }
  }
});

// Callback route
router.get("/callback", async (req, res) => {
  try {
    const data = await spotifyApi.authorizationCodeGrant(req.query.code);
    req.session.token_info = {
      access_token: data.body["access_token"],
      refresh_token: data.body["refresh_token"],
      expires_in: Date.now() + 108000,
    };

    console.log("Token info set in session:", req.session.token_info);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);
    spotifyApi.setRefreshToken(data.body["refresh_token"]);

    res.redirect("http://localhost:5173/?login=success");
  } catch (error) {
    console.error("Error during callback token handling:", error);
    res.status(401).send("Failed to get token");
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

router.get("/spotify-profile", async (req, res) => {
  if (!req.session.token_info || !req.session.token_info.access_token) {
    return res.status(401).send("Unauthorized: No session available");
  }
  const profileUrl = "https://www.spotify.com/account/overview/";
  res.json({ profileUrl });
});

module.exports = router;
