using csharp_web_api.Data;
using csharp_web_api.Helpers;
using csharp_web_api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Bind appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// Configure SQLite Database
var connectionString = builder.Configuration.GetConnectionString("SpotifyConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlite(connectionString)
);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();

// Retrieve Spotify API and JWT values from appsettings.json
var secretKey = builder.Configuration["SecretKey"]
	?? throw new InvalidOperationException("SecretKey not found in configuration");
var clientId = builder.Configuration["SpotifyApi:ClientId"]
	?? throw new InvalidOperationException("ClientId not found in configuration");
var clientSecret = builder.Configuration["SpotifyApi:ClientSecret"]
	?? throw new InvalidOperationException("ClientSecret not found in configuration");
var redirectUri = builder.Configuration["SpotifyApi:RedirectUri"]
	?? throw new InvalidOperationException("RedirectUri not found in configuration");

var issuer = "http://localhost:7185";
var audience = "http://localhost:5173";

builder.Services.AddSingleton(new JwtTokenHelper(secretKey, issuer, audience));
builder.Services.AddSingleton(new SpotifyAuthService(clientId, clientSecret, redirectUri));

// Configure JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = issuer,
		ValidAudience = audience,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
	};
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
	app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();