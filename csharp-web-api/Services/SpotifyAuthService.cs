using System.Text.Json;
using System.Text.Json.Serialization;

namespace csharp_web_api.Services
{
	public class SpotifyAuthService(string clientId, string clientSecret, string redirectUri)
	{
		public readonly string _clientId = clientId;
		public readonly string _clientSecret = clientSecret;
		public readonly string _redirectUri = redirectUri;
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

			var content = await response.Content.ReadAsStringAsync();
			if (!response.IsSuccessStatusCode)
			{
				throw new Exception($"Error fetching access token: {response.ReasonPhrase}. Response: {content}");
			}

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
		[JsonPropertyName("access_token")]
		public required string AccessToken { get; set; }
		[JsonPropertyName("refresh_token")]
		public string? RefreshToken { get; set; }
		[JsonPropertyName("expires_in")]
		public int ExpiresIn { get; set; }
		[JsonPropertyName("token_type")]
		public string? TokenType { get; set; }
		[JsonPropertyName("scope")]
		public string? Scope { get; set; }
	}
}
