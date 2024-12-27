using csharp_web_api.Models;
using Microsoft.EntityFrameworkCore;

namespace csharp_web_api.Data
{
	public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
	{
		public DbSet<UserPreferences> UserPreferences { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<UserPreferences>(entity =>
			{
				entity.HasKey(up => up.Id);

				entity.Property(up => up.SpotifyUserId)
					 .IsRequired()
					 .HasMaxLength(50);

				entity.Property(up => up.DisplayName)
					  .HasMaxLength(100); // Max length of 100 characters

				entity.Property(up => up.Email)
					  .HasMaxLength(150);

				entity.Property(up => up.TopGenres)
					  .HasMaxLength(500); // Max length of 500 characters

				entity.Property(up => up.TopArtists)
					  .HasMaxLength(500);

				entity.Property(up => up.TopTracks)
					  .HasMaxLength(500);

				entity.Property(up => up.Playlists)
					  .HasMaxLength(500);

				entity.Property(up => up.Country)
					  .HasMaxLength(10); // Max length for ISO country codes

				entity.Property(up => up.LastLogin)
					  .HasDefaultValueSql("CURRENT_TIMESTAMP");
			});
			base.OnModelCreating(modelBuilder);
		}
	}
}
