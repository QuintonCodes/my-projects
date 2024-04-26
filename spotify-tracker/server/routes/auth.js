const router = require("express").Router();
const spotifyApi = require("../utils/spotifyClient");
const db = require("../utils/db");

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
  const userId = req.session.userId;
  if (!req.session[userId] || !req.session[userId].token_info.access_token) {
    return res.status(401).send("Unauthorized: No session available");
  }

  const tokenInfo = req.session[userId].token_info;
  if (tokenInfo.expires_in < Date.now()) {
    try {
      const data = await spotifyApi.refreshAccessToken(tokenInfo.refresh_token);
      tokenInfo.access_token = data.body["access_token"];
      tokenInfo.expires_in = Date.now() + data.body["expires_in"] * 1000;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return res.status(401).send("Failed to refresh access token");
    }
  }

  try {
    spotifyApi.setAccessToken(tokenInfo.access_token);
    const me = await spotifyApi.getMe();
    const profile = {
      display_name: me.body.display_name,
      id: me.body.id,
      image: me.body.images[0] ? me.body.images[0].url : null,
    };
    res.json(profile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Failed to fetch user profile");
  }
});

// Callback route
router.get("/callback", async (req, res) => {
  try {
    const data = await spotifyApi.authorizationCodeGrant(req.query.code);
    const userProfile = await spotifyApi.getMe();

    const sessionKey = userProfile.body.id;
    req.session[sessionKey] = {
      token_info: {
        access_token: data.body["access_token"],
        refresh_token: data.body["refresh_token"],
        expires_in: Date.now() + data.body["expires_in"] * 1000,
      },
    };

    req.session.save((err) => {
      if (err) throw err;
      console.log("Session saved!");
    });

    console.log(
      `Token info set in session for user ${sessionKey}:`,
      req.session[sessionKey].token_info
    );

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);
    spotifyApi.setRefreshToken(data.body["refresh_token"]);

    spotifyApi.on("refresh_access_token", (refreshToken) => {
      spotifyApi.refreshAccessToken(refreshToken).then(
        (data) => {
          console.log("Access token has been refreshed !");
          spotifyApi.setAccessToken(data.body["access_token"]);
          req.session[sessionKey].token_info.access_token =
            data.body["access_token"];
        },
        (err) => {
          console.log("Could not refresh access token", err);
        }
      );
    });

    db.run(
      "INSERT OR IGNORE INTO users (username, display_name, profile_pic_url) VALUES (?, ?, ?)",
      [
        userProfile.body.id,
        userProfile.body.display_name,
        userProfile.body.images[0] ? userProfile.body.images[0].url : null,
      ],
      (err) => {
        if (err) {
          return console.log("Error inserting user data", err.message);
        }
        console.log("User data updated or inserted");
      }
    );

    res.send(`<html><script>window.close();</script></html>`);
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

module.exports = router;
