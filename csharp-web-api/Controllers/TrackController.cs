using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web;

namespace csharp_web_api.Controllers
{
	[Route("api/tracks")]
	[ApiController]
	public class TrackController(ISpotifyClient spotifyClient) : ControllerBase
	{
		private readonly ISpotifyClient _spotifyClient = spotifyClient;

		/// <summary>
		/// Get the top 50 currently popular tracks globally.
		/// </summary>
		[HttpGet("top")]
		public async Task<IActionResult> GetTopTracks()
		{
			try
			{
				var newReleases = await _spotifyClient.Browse.GetNewReleases(new NewReleasesRequest { Limit = 50, Country = "ES"});

				return Ok(newReleases?.Albums?.Items?.Select(album => new
				{
					AlbumName = album.Name,
					album.Artists,
					album.ReleaseDate,
					album.Images,
					album.TotalTracks
				}));
			}
			catch (APIException ex)
			{
				return StatusCode((int?)ex.Response?.StatusCode ?? 500, new { ex.Message });
			}
		}

		/// <summary>
		/// Get the 10 latest album releases.
		/// </summary>
		[HttpGet("new-albums")]
		public async Task<IActionResult> GetNewAlbums()
		{
			try
			{
				// Fetch new album releases
				var newReleases = await _spotifyClient.Browse.GetNewReleases(new NewReleasesRequest
				{
					Limit = 10, // Fetch the latest 10 albums
					Country = "ES" // You can adjust the country as needed
				});

				if (newReleases?.Albums?.Items == null || newReleases.Albums.Items.Count == 0)
				{
					return NotFound(new { message = "No new albums found." });
				}

				return Ok(newReleases?.Albums?.Items?.Select(album => new
				{
					AlbumName = album.Name,
					Artists = album.Artists.Select(artist => artist.Name),
					album.ReleaseDate,
					Images = album.Images.FirstOrDefault()?.Url, // Get the first image (cover art)
					album.TotalTracks
				}));
			}
			catch (APIException ex)
			{
				return StatusCode((int?)ex.Response?.StatusCode ?? 500, new { ex.Message });
			}
		}

		/// <summary>
		/// Get the user's saved albums.
		/// </summary>
		[HttpGet("saved-albums")]
		public async Task<IActionResult> GetSavedAlbums()
		{
			try
			{
				var savedAlbums = await _spotifyClient.Library.GetAlbums(new LibraryAlbumsRequest
				{
					Limit = 20 // Fetch up to 20 albums (you can adjust as needed)
				});

				if (savedAlbums?.Items == null || savedAlbums.Items.Count == 0)
				{
					return NotFound(new { message = "No saved albums found." });
				}

				return Ok(savedAlbums.Items.Select(album => new
				{
					AlbumName = album.Album.Name,
					Artists = album.Album.Artists.Select(artist => artist.Name),
					album.Album.ReleaseDate,
					Images = album.Album.Images.FirstOrDefault()?.Url, // Get the first image (cover art)
					album.Album.TotalTracks
				}));
			}
			catch (APIException ex)
			{
				return StatusCode((int?)ex.Response?.StatusCode ?? 500, new { ex.Message });
			}
		}
	}
}
