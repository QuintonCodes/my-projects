const spotifyApi = require("./spotifyClient");

async function refreshTokenIfNeeded(req, res, next) {
  if (!req.session.token_info) {
    return res.redirect("/auth/login");
  }

  const { access_token, refresh_token, expires_in } = req.session.token_info;
  const expirationTime = new Date(expires_in);
  if (Date.now() > expirationTime.getTime()) {
    // Check if the token has expired
    try {
      const data = await spotifyApi.refreshAccessToken();

      req.session.token_info = {
        access_token: data.body["access_token"],
        refresh_token: refresh_token, // Some APIs do not return a new refresh token
        expires_in: Date.now() + data.body["expires_in"] * 1000,
      };
      spotifyApi.setAccessToken(data.body["access_token"]);
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return res.status(401).send("Failed to refresh token");
    }
  } else {
    spotifyApi.setAccessToken(access_token);
  }
  next();
}

module.exports = refreshTokenIfNeeded;
