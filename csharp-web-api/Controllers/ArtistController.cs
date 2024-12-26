using csharp_web_api.Helpers;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web;

namespace csharp_web_api.Controllers
{
	[Route("api/artists")]
	[ApiController]
	public class ArtistController(ISpotifyClient spotifyClient) : ControllerBase
	{
		private readonly ISpotifyClient _spotifyClient = spotifyClient;

		/// <summary>
		/// Get followed artists.
		/// </summary>
		/// <param name="limit">Number of artists to fetch</param>
		/// <param name="after">Cursor for pagination</param>
		/// <returns>List of followed artists</returns>
		[HttpGet("followed")]
		public async Task<IActionResult> GetFollowedArtists(int limit = 10, string after = "") {
			var followedArtists = await _spotifyClient.Follow.OfCurrentUser(new FollowOfCurrentUserRequest
			{
				TypeParam = FollowOfCurrentUserRequest.Type.Artist,
				Limit = limit,
				After = after,
			});
			var artists = followedArtists.Artists;
			return Ok(new { artists.Items, artists.Total, artists.Next});
		}

		/// <summary>
		/// Get a random followed artist.
		/// </summary>
		/// <returns>Single random artist</returns>
		[HttpGet("daily")]
		public async Task<IActionResult> GetDailyArtist()
		{
			var followedArtists = new List<FullArtist>();
			string? after = null;

			do
			{
				Console.WriteLine($"Fetching artists with cursor: {after ?? "null"}");

				var followed = await RetryHelper.RetryOnFailure(() => _spotifyClient.Follow.OfCurrentUser(new FollowOfCurrentUserRequest
				{
					TypeParam = FollowOfCurrentUserRequest.Type.Artist,
					Limit = 50,
					After = after
				}));

				if (followed?.Artists?.Items != null)
				{
					followedArtists.AddRange(followed.Artists.Items);
				}

				after = followed?.Artists?.Cursors?.After;
			}
			while (!string.IsNullOrEmpty(after));

			followedArtists = followedArtists.Where(artist => !string.IsNullOrEmpty(artist.Id)).ToList();

			if (followedArtists.Count == 0)
				return NotFound("No followed artists found with valid data");

			var random = new Random();
			var randomArtist = followedArtists[random.Next(followedArtists.Count)];

			return Ok(new
			{
				randomArtist.Id,
				randomArtist.Name,
				randomArtist.Genres,
				randomArtist.Images,
				randomArtist.Followers.Total
			});
		}

		/// <summary>
		/// Get details for a specific artist.
		/// </summary>
		/// <param name="id">Artist ID</param>
		/// <returns>Artist details</returns>
		[HttpGet("{id}")]
		public async Task<IActionResult> GetArtist(string id)
		{
			try
			{
				var artist = await _spotifyClient.Artists.Get(id);
				return Ok(artist);
			} catch (APIException ex)
			{
				return NotFound(new { ex.Message });
			}
		}

		/// <summary>
		/// Get an artist's top tracks.
		/// </summary>
		/// <param name="id">Artist ID</param>
		/// <returns>List of top tracks</returns>
		[HttpGet("{id}/top-tracks")]
		public async Task<IActionResult> GetArtistTopTracks(string id)
		{
			try
			{
				var topTracks = await _spotifyClient.Artists.GetTopTracks(id, new ArtistsTopTracksRequest("ES"));
				return Ok(topTracks.Tracks);
			}
			catch (APIException ex)
			{
				return NotFound(new { ex.Message });
			}
		}
	}
}
