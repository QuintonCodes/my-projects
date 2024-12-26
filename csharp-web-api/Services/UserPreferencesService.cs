using csharp_web_api.Data;
using csharp_web_api.Models;
using Microsoft.EntityFrameworkCore;

namespace csharp_web_api.Services
{
	public class UserPreferencesService(ApplicationDbContext context)
	{
		private readonly ApplicationDbContext _context = context;

		public async Task<UserPreferences> GetUserPreferences(string spotifyUserId)
		{
			return await _context.UserPreferences.FirstOrDefaultAsync(up => up.SpotifyUserId == spotifyUserId);
		}

		public async Task UpdateUserPreferences(UserPreferences userPreferences)
		{
			_context.UserPreferences.Update(userPreferences);
			await _context.SaveChangesAsync();
		}
	}
}
