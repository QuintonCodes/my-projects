using csharp_web_api.Services;

namespace csharp_web_api.Middleware
{
	public class TokenRefreshMiddleware(RequestDelegate next, SpotifyAuthService spotifyAuthService)
	{
		private readonly RequestDelegate _next = next;
		private readonly SpotifyAuthService _spotifyAuthService = spotifyAuthService;

		public async Task Invoke(HttpContext context)
		{
			var refreshToken = context.Session.GetString("RefreshToken");
			var accessTokenExpiry = context.Session.GetString("AccessTokenExpiry");

			if (!string.IsNullOrEmpty(refreshToken) && (!DateTime.TryParse(accessTokenExpiry, out var expiry) || expiry < DateTime.UtcNow))
			{
				var tokenResponse = await _spotifyAuthService.RefreshAccessTokenAsync(refreshToken);
				context.Session.SetString("AccessToken", tokenResponse.AccessToken);
				context.Session.SetString("AccessTokenExpiry", DateTime.UtcNow.AddSeconds(tokenResponse.ExpiresIn).ToString());
			}

			await _next(context);
		}
	}
}
