using csharp_web_api.Data;
using csharp_web_api.Models;
using Microsoft.EntityFrameworkCore;

namespace csharp_web_api.Services
{
	public class UserPreferencesService(ApplicationDbContext context)
	{
		private readonly ApplicationDbContext _context = context;

		public async Task<UserPreferences?> GetUserPreferences(string spotifyUserId)
		{
			return await _context.UserPreferences.FirstOrDefaultAsync(up => up.SpotifyUserId == spotifyUserId);
		}

		public async Task SaveOrUpdateUserPreferences(UserPreferences userPreferences)
		{
			var existingPreferences = await GetUserPreferences(userPreferences.SpotifyUserId);

			if (existingPreferences != null)
			{
				existingPreferences.TopArtists = userPreferences.TopArtists;
				existingPreferences.TopGenres = userPreferences.TopGenres;
				existingPreferences.TopTracks = userPreferences.TopTracks;
				//existingPreferences.LastUpdated = DateTime.UtcNow;
				_context.UserPreferences.Update(existingPreferences);
			} else
			{
				await _context.UserPreferences.AddAsync(userPreferences);
			}
			await _context.SaveChangesAsync();
		}
	}
}
