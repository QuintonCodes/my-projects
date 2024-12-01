using csharp_web_api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace csharp_web_api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SpotifyAuthController(SpotifyAuthService spotifyAuthService) : ControllerBase
	{
		private readonly SpotifyAuthService _spotifyAuthService = spotifyAuthService;

		[HttpPost("get-access-token")]
		public async Task<IActionResult> GetAccessToken([FromBody] SpotifyAuthRequest request)
		{
			try
			{
				var accessToken = await _spotifyAuthService.GetAccessTokenAsync(request.Code);
				return Ok(new { accessToken });
			} catch (Exception ex)
			{
				return BadRequest(new { error = ex.Message });
			}
		}

		[HttpPost("refresh-token")]
		public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
		{
			try
			{
				var accessToken = await _spotifyAuthService.RefreshAccessTokenAsync(request.RefreshToken);
				return Ok(new { accessToken });
			}
			catch (Exception ex)
			{
				return BadRequest(new { error = ex.Message });
			}
		}

		[HttpGet("hello-world")]
		public IActionResult HelloWorld()
		{
			return Ok("Hello, World!");
		}
	}

	// Request Models
	public class SpotifyAuthRequest
	{
		public required string Code { get; set; }
	}

	public class RefreshTokenRequest
	{
		public required string RefreshToken { get; set; }
	}
}
