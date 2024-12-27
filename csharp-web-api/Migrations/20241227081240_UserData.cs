using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace csharp_web_api.Migrations
{
    /// <inheritdoc />
    public partial class UserData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserPreferences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SpotifyUserId = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    DisplayName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 150, nullable: true),
                    TopGenres = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    TopArtists = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    TopTracks = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    Playlists = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    Country = table.Column<string>(type: "TEXT", maxLength: 10, nullable: true),
                    LastLogin = table.Column<DateTime>(type: "TEXT", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPreferences", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserPreferences");
        }
    }
}
