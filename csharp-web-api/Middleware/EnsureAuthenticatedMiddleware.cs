namespace csharp_web_api.Middleware
{
	public class EnsureAuthenticatedMiddleware(RequestDelegate next)
	{
		private readonly RequestDelegate _next = next;

		public async Task Invoke(HttpContext context)
		{
			var path = context.Request.Path.Value?.ToLower();
			if (path != null && path.StartsWith("/api/spotify-auth"))
			{
				await _next(context);
				return;
			}

			var accessToken = context.Session.GetString("AccessToken");
			if (string.IsNullOrEmpty(accessToken))
			{
				context.Response.Redirect("/api/spotify-auth/login");
				return;
			}

			await _next(context);
		}
	}
}
