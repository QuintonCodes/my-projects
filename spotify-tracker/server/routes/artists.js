const router = require("express").Router();
const spotifyApi = require("../utils/spotifyClient");
const refreshTokenIfNeeded = require("../utils/refreshToken");

function ensureAuthenticated(req, res, next) {
  if (!req.session.token_info) {
    return res.redirect("/auth/login");
  }
  spotifyApi.setAccessToken(req.session.token_info.access_token);
  next();
}

// Simplified data extraction function
function simplifyArtistData(artist) {
  return {
    id: artist.id,
    name: artist.name,
    image: artist.images.length > 0 ? artist.images[0].url : null,
    monthlyFollowers: artist.followers.total,
  };
}

// Get followed artists
router.get(
  "/get_followed_artists",
  ensureAuthenticated,
  refreshTokenIfNeeded,
  async (req, res) => {
    try {
      if (!req.session.full_artist_list) {
        let allArtists = [];
        let after = undefined;

        while (true) {
          const data = await spotifyApi.getFollowedArtists({
            limit: 50,
            after,
          });
          allArtists = allArtists.concat(data.body.artists.items);
          after = data.body.artists.cursors.after;
          if (!after) {
            break;
          }
        }

        // Randomize the order
        req.session.full_artist_list = allArtists
          .map((artist) => ({ artist, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ artist }) => simplifyArtistData(artist));
      }

      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const paginatedArtists = req.session.full_artist_list.slice(
        offset,
        offset + limit
      );

      res.json(paginatedArtists);
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
  }
);

// Get artist of the day
router.get(
  "/get_random_artist",
  ensureAuthenticated,
  refreshTokenIfNeeded,
  async (req, res) => {
    try {
      if (!req.session.full_artist_list) {
        let allArtists = [];
        let after = undefined;

        while (true) {
          const data = await spotifyApi.getFollowedArtists({
            limit: 50,
            after,
          });
          allArtists = allArtists.concat(data.body.artists.items);
          after = data.body.artists.cursors.after;
          if (!after) {
            break; // Exit loop when no further pages are left
          }
        }
        req.session.full_artist_list = allArtists.map(simplifyArtistData);
      }

      if (req.session.full_artist_list.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * req.session.full_artist_list.length
        );
        const randomArtist = req.session.full_artist_list[randomIndex];

        res.json(randomArtist);
      } else {
        res.status(404).send("No followed artists found");
      }
    } catch (error) {
      console.error("Failed to fetch artists:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch artists", message: error.message });
    }
  }
);

module.exports = router;
