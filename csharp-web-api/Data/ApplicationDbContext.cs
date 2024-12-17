using csharp_web_api.Models;
using Microsoft.EntityFrameworkCore;

namespace csharp_web_api.Data
{
	public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
	{
		public DbSet<UserPreferences> UserPreferences { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}
}
