namespace csharp_web_api.Models
{
	public class UserPreferences
	{
		public int Id { get; set; }
		public required string SpotifyUserId { get; set; }
		public string? DisplayName { get; set; }
		public string? Email { get; set; }
		public string? TopGenres { get; set; }
		public string? TopArtists { get; set; }
		public string? TopTracks { get; set; }
		public string? Playlists { get; set; }
		public string? Country { get; set; }
		public DateTime LastLogin { get; set; }
	}
}
