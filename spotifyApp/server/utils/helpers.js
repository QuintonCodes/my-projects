const spotifyApi = require("./spotifyClient");

function ensureAuthenticated(req, res, next) {
  if (!req.session.token_info) {
    return res.redirect("/auth/login");
  }
  spotifyApi.setAccessToken(req.session.token_info.access_token);
  next();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Data extraction functions
async function getTopTracksForArtist(artistId) {
  try {
    const topTracks = await spotifyApi.getArtistTopTracks(artistId, "ES");
    return topTracks.body.tracks.slice(0, 5).map((track) => ({
      id: track.id,
      name: track.name,
      image: track.album.images.length > 0 ? track.album.images[0].url : null,
      durationMs: track.duration_ms,
    }));
  } catch (error) {
    console.error("Error fetching top tracks for artist:", error);
    throw error;
  }
}

function simplifyArtistDataBasic(artist) {
  return {
    id: artist.id,
    name: artist.name,
    image: artist.images.length > 0 ? artist.images[0].url : null,
    followers: artist.followers.total,
    popularity: artist.popularity,
    genres: artist.genres,
  };
}

module.exports = {
  ensureAuthenticated,
  shuffleArray,
  getTopTracksForArtist,
  simplifyArtistDataBasic,
};
