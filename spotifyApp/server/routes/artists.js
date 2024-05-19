const router = require("express").Router();
const spotifyApi = require("../utils/spotifyClient");
const refreshTokenIfNeeded = require("../utils/refreshToken");
const {
  ensureAuthenticated,
  shuffleArray,
  getTopTracksForArtist,
  simplifyArtistDataBasic,
} = require("../utils/helpers");

let dailyArtist = {
  artist: null,
  timestamp: 0,
};

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

        req.session.full_artist_list = await Promise.all(
          allArtists.map(simplifyArtistDataBasic)
        );
        shuffleArray(req.session.full_artist_list);
      }

      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const paginatedArtists = req.session.full_artist_list.slice(
        offset,
        offset + limit
      );

      res.json({
        artists: paginatedArtists,
        total: req.session.full_artist_list.length,
      });
    } catch (error) {
      console.error("Failed to fetch followed artists:", error);
      res.status(500).json({
        error: "Failed to fetch artists",
        message: error.response
          ? error.response.data.error.message
          : error.message,
      });
    }
  }
);

// Get daily artist
router.get(
  "/get_random_artist",
  ensureAuthenticated,
  refreshTokenIfNeeded,
  async (req, res) => {
    try {
      const currentTimestamp = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (
        !dailyArtist.artist ||
        currentTimestamp - dailyArtist.timestamp > oneDay
      ) {
        let allArtists = req.session.full_artist_list || [];

        if (allArtists.length === 0) {
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
          allArtists = await Promise.all(
            allArtists.map(simplifyArtistDataBasic)
          );
          req.session.full_artist_list = allArtists;
        }

        // Select a new random artist
        const randomIndex = Math.floor(Math.random() * allArtists.length);
        dailyArtist = {
          artist: allArtists[randomIndex],
          timestamp: currentTimestamp,
        };
      }

      res.json(dailyArtist.artist);
    } catch (error) {
      console.error("Failed to get random artist:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch artist", message: error.message });
    }
  }
);

// Fetch artist's top tracks
router.get(
  "/:id/top_tracks",
  ensureAuthenticated,
  refreshTokenIfNeeded,
  async (req, res) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-zA-Z]+$/)) {
      return res.status(400).json({ error: "Invalid artist ID format" });
    }
    try {
      const tracks = await getTopTracksForArtist(id);
      res.json(tracks);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch top tracks", message: error.message });
    }
  }
);

// Get a single artist
router.get(
  "/:id",
  ensureAuthenticated,
  refreshTokenIfNeeded,
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-zA-Z]+$/)) {
        return res.status(400).json({ error: "Invalid artist ID format" });
      }

      const artist = await spotifyApi.getArtist(id);
      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }
      res.json(simplifyArtistDataBasic(artist.body));
    } catch (error) {
      console.error(`Error fetching artist with id ${req.params.id}:`, error);
      res
        .status(500)
        .json({ error: "Failed to fetch artist", message: error.message });
    }
  }
);

module.exports = router;
