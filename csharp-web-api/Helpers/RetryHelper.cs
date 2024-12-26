using SpotifyAPI.Web;

namespace csharp_web_api.Helpers
{
	public static class RetryHelper
	{
		public static async Task<T?> RetryOnFailure<T>(Func<Task<T>> action, int retries = 3)
		{
			for (int i = 0; i < retries; i++)
			{
				try
				{
					return await action();
				}
				catch (APIException) when (i < retries - 1)
				{
					await Task.Delay(1000);
				}
			}
			return default;
		}
	}
}
