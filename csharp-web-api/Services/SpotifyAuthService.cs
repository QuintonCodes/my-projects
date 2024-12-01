using System.Text.Json;

namespace csharp_web_api.Services
{
	public class SpotifyAuthService(string clientId, string clientSecret, string redirectUri)
	{
		private readonly string _clientId = clientId;
		private readonly string _clientSecret = clientSecret;
		private readonly string _redirectUri = redirectUri;
		private readonly HttpClient _httpClient = new();

		public async Task<string> GetAccessTokenAsync(string code)
		{
			var requestBody = new FormUrlEncodedContent(
			[
				new KeyValuePair<string, string>("grant_type", "authorization_code"),
				new KeyValuePair<string, string>("code", code),
				new KeyValuePair<string, string>("redirect_uri", _redirectUri),
				new KeyValuePair<string, string>("client_id", _clientId),
				new KeyValuePair<string, string>("client_secret", _clientSecret)
			]);

			var response = await _httpClient.PostAsync("https://accounts.spotify.com/api/token", requestBody);

			if (!response.IsSuccessStatusCode)
			{
				throw new Exception($"Error fetching access token: {response.ReasonPhrase}");
			}

			var content = await response.Content.ReadAsStringAsync();
			var tokenResponse = JsonSerializer.Deserialize<SpotifyTokenResponse>(content);

			return tokenResponse?.AccessToken ?? throw new Exception("Access token not found in response.");
		}

		public async Task<string> RefreshAccessTokenAsync(string refreshToken)
		{
			var requestBody = new FormUrlEncodedContent(
			[
				new KeyValuePair<string, string>("grant_type", "refresh_token"),
				new KeyValuePair<string, string>("refresh_token", refreshToken),
				new KeyValuePair<string, string>("client_id", _clientId),
				new KeyValuePair<string, string>("client_secret", _clientSecret)
			]);

			var response = await _httpClient.PostAsync("https://accounts.spotify.com/api/token", requestBody);

			if (!response.IsSuccessStatusCode)
			{
				throw new Exception($"Error refreshing access token: {response.ReasonPhrase}");
			}

			var content = await response.Content.ReadAsStringAsync();
			var tokenResponse = JsonSerializer.Deserialize<SpotifyTokenResponse>(content);

			return tokenResponse?.AccessToken ?? throw new Exception("Access token not found in response.");
		}
	}

	public class SpotifyTokenResponse
	{
		public required string AccessToken { get; set; }
		public string? RefreshToken { get; set; }
		public int ExpiresIn { get; set; }
	}
}
