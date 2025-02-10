using csharp_web_api.Data;
using csharp_web_api.Helpers;
using csharp_web_api.Middleware;
using csharp_web_api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SpotifyAPI.Web;
using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Bind appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// Configure SQLite Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseNpgsql(builder.Configuration.GetConnectionString("SpotifyConnection")));

// Services
var secretKey = builder.Configuration["SecretKey"]
	?? throw new InvalidOperationException("SecretKey not found in configuration");
var clientId = builder.Configuration["SpotifyApi:ClientId"]
	?? throw new InvalidOperationException("ClientId not found in configuration");
var clientSecret = builder.Configuration["SpotifyApi:ClientSecret"]
	?? throw new InvalidOperationException("ClientSecret not found in configuration");
var redirectUri = builder.Configuration["SpotifyApi:RedirectUri"]
	?? throw new InvalidOperationException("RedirectUri not found in configuration");

builder.Services.AddSingleton(new JwtTokenHelper(secretKey, "http://localhost:7185", "http://localhost:5173"));
builder.Services.AddSingleton(new SpotifyAuthService(clientId, clientSecret, redirectUri));

builder.Services.AddControllers().AddJsonOptions(options =>
{
	options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
	options.Cookie.HttpOnly = true;
	options.Cookie.IsEssential = true;
	options.IdleTimeout = TimeSpan.FromMinutes(30);
});

builder.Services.AddScoped<ISpotifyClient>(provider =>
{
	var spotifyAuthService = provider.GetRequiredService<SpotifyAuthService>();
	var accessToken = provider.GetService<IHttpContextAccessor>()?.HttpContext?.Session.GetString("AccessToken");

	if (string.IsNullOrEmpty(accessToken))
	{
		throw new InvalidOperationException("Access token not found in session.");
	}

	return new SpotifyClient(accessToken);
});

builder.Services.AddHttpContextAccessor();

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
		ValidIssuer = "http://localhost:7185",
		ValidAudience = "http://localhost:5173",
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
	};
});

builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
	app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseSession();
app.UseRouting();

app.UseMiddleware<EnsureAuthenticatedMiddleware>();
app.UseMiddleware<TokenRefreshMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();