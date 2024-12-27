using csharp_web_api.Services;
using csharp_web_api.Helpers;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web;
using csharp_web_api.Models;

namespace csharp_web_api.Controllers
{
	[Route("api/me")]
	[ApiController]
	public class UserController(ISpotifyClient spotifyClient, UserPreferencesService userPreferencesService) : ControllerBase
	{
		private readonly ISpotifyClient _spotifyClient = spotifyClient;
		private readonly UserPreferencesService _userPreferencesService = userPreferencesService;

		/// <summary>
		/// Get the current user's profile.
		/// </summary>
		[HttpGet("profile")]
		public async Task<IActionResult> GetUserProfile()
		{
			try
			{
				var profile = await _spotifyClient.UserProfile.Current();

				var topArtists = await _spotifyClient.Personalization.GetTopArtists(new PersonalizationTopRequest { Limit = 10 });
				var topTracks = await _spotifyClient.Personalization.GetTopTracks(new PersonalizationTopRequest { Limit = 10 });

				var topGenres = topArtists?.Items?.SelectMany(artist => artist.Genres).Distinct();
				var playlists = await _spotifyClient.Playlists.CurrentUsers(new PlaylistCurrentUsersRequest { Limit = 5 });

				var userPreferences = new UserPreferences
				{
					SpotifyUserId = profile.Id,
					DisplayName = profile.DisplayName,
					Email = profile.Email,
					TopArtists = topArtists?.Items == null ? string.Empty : string.Join(",", topArtists.Items.Select(artist => artist.Name)),
					TopTracks = topTracks?.Items == null ? string.Empty : string.Join(",", topTracks.Items.Select(track => track.Name)),
					TopGenres = topGenres == null ? string.Empty : string.Join(",", topGenres),
					Playlists = playlists?.Items == null ? string.Empty : string.Join(",", playlists.Items.Select(p => p.Name)),
					Country = profile.Country,
					LastLogin = DateTime.UtcNow
				};

				await _userPreferencesService.SaveOrUpdateUserPreferences(userPreferences);

				return Ok(new
				{
					profile.Id,
					profile.DisplayName,
					profile.Email,
					profile.Followers.Total,
					profile.Images,
					profile.Country,
					userPreferences
				});
			}
			catch (APIException ex)
			{
				return StatusCode((int?)ex.Response?.StatusCode ?? 500, new { ex.Message });
			}
		}

		/// <summary>
		/// Get the user's top artists with an optional time range filter
		/// </summary>
		[HttpGet("top/artists")]
		public async Task<IActionResult> GetTopArtists([FromQuery] string timeRange = "long_term")
		{
			try
			{
				var validTimeRanges = new[] { "short_term", "medium_term", "long_term" };
				if (!validTimeRanges.Contains(timeRange))
				{
					return BadRequest(new { message = "Invalid time range. Valid values are: short_term, medium_term, long_term." });
				}

				// Convert the string to the corresponding enum value
				var timeRangeParam = timeRange switch
				{
					"short_term" => PersonalizationTopRequest.TimeRange.ShortTerm,
					"medium_term" => PersonalizationTopRequest.TimeRange.MediumTerm,
					_ => PersonalizationTopRequest.TimeRange.LongTerm
				};

				var topArtists = await _spotifyClient.Personalization.GetTopArtists(new PersonalizationTopRequest
				{
					Limit = 10,
					TimeRangeParam = timeRangeParam
				});

				return Ok(topArtists?.Items?.Select(artist => new
				{
					artist.Name,
					artist.Id,
					artist.Genres,
					artist.Images,
					artist.Popularity,
					artist.Followers
				}));
			}
			catch (APIException ex)
			{
				return StatusCode((int?)ex.Response?.StatusCode ?? 500, new { ex.Message });
			}
		}

		/// <summary>
		/// Get the user's top tracks with an optional time range filter.
		/// </summary>
		[HttpGet("top/tracks")]
		public async Task<IActionResult> GetTopTracks([FromQuery] string timeRange = "long_term")
		{
			try
			{
				// Validate the timeRange input
				var validTimeRanges = new[] { "short_term", "medium_term", "long_term" };
				if (!validTimeRanges.Contains(timeRange))
				{
					return BadRequest(new { message = "Invalid time range. Valid values are: short_term, medium_term, long_term." });
				}

				// Convert the string to the corresponding enum value
				var timeRangeParam = timeRange switch
				{
					"short_term" => PersonalizationTopRequest.TimeRange.ShortTerm,
					"medium_term" => PersonalizationTopRequest.TimeRange.MediumTerm,
					_ => PersonalizationTopRequest.TimeRange.LongTerm
				};

				var topTracks = await _spotifyClient.Personalization.GetTopTracks(new PersonalizationTopRequest
				{
					Limit = 20,
					TimeRangeParam = timeRangeParam
				});

				return Ok(topTracks?.Items?.Select(track => new
				{
					track.Name,
					track.Id,
					Artists = track.Artists.Select(artist => artist.Name),
					track.Album.Images,
					track.Popularity
				}));
			}
			catch (APIException ex)
			{
				return StatusCode((int?)ex.Response?.StatusCode ?? 500, new { ex.Message });
			}
		}

		/// <summary>
		/// Get the user's playlists.
		/// </summary>
		[HttpGet("playlists")]
		public async Task<IActionResult> GetUserPlaylists()
		{
			try
			{
				var playlists = await _spotifyClient.Playlists.CurrentUsers(new PlaylistCurrentUsersRequest
				{
					Limit = 20
				});

				return Ok(playlists?.Items?.Select(playlist => new
				{
					playlist.Name,
					playlist.Id,
					playlist.Images,
					playlist.Owner?.DisplayName,
					playlist.Tracks?.Total
				}));
			}
			catch (APIException ex)
			{
				return StatusCode((int?)ex.Response?.StatusCode ?? 500, new { ex.Message });
			}
		}

		/// <summary>
		/// Get the user's followed artists' genres.
		/// </summary>
		[HttpGet("genres")]
		public async Task<IActionResult> GetUserGenres()
		{
			try
			{
				var genresCount = new Dictionary<string, int>();
				string? after = null;

				do
				{
					var followed = await RetryHelper.RetryOnFailure(() => _spotifyClient.Follow.OfCurrentUser(new FollowOfCurrentUserRequest
					{
						TypeParam = FollowOfCurrentUserRequest.Type.Artist,
						Limit = 50,
						After = after
					}));

					if (followed?.Artists?.Items != null)
					{
						foreach (var artist in followed.Artists.Items)
						{
							foreach (var genre in artist.Genres)
							{
								if (genresCount.TryGetValue(genre, out int value))
									genresCount[genre] = ++value;
								else
									genresCount[genre] = 1;
							}
						}
					}

					after = followed?.Artists?.Cursors?.After;
				}
				while (!string.IsNullOrEmpty(after));

				var sortedGenres = genresCount
					.OrderByDescending(g => g.Value)
					.Select(g => new { Genre = g.Key, Count = g.Value });

				return Ok(sortedGenres);
			}
			catch (APIException ex)
			{
				return StatusCode((int?)ex.Response?.StatusCode ?? 500, new { ex.Message });
			}
		}
	}
}
