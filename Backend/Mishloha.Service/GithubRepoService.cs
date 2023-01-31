using Mishloha.Models;
using System.Text.Json;

namespace Mishloha.Service
{
    public class GithubRepoService
    {
        private HttpClient httpClient;

        public GithubRepoService()
        {
            httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("https://api.github.com/search/repositories");
            httpClient.DefaultRequestHeaders.Add("User-Agent", "C# App");   //Adding User-Agent header as default due to GitHub API requirement
        }

        // Get repositories from GitHubAPI created at the past timeframe
        public List<GithubRepo> SearchByTimeframe(Enums.Timeframe timeframe, int page)
        {
            List<GithubRepo> result = new List<GithubRepo>();
            try
            {
                string timeframeParam = TimeframeEnumToDateString(timeframe);
                string queryString = $"?sort=stars&order=desc&page={page}&per_page=30&q=created:>={timeframeParam}";
                using HttpResponseMessage httpResponse = httpClient.GetAsync(queryString).Result;
                httpResponse.EnsureSuccessStatusCode();

                String jsonResponseString = httpResponse.Content.ReadAsStringAsync().Result;
                result = JsonToGithubRepos(jsonResponseString);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
            return result;
        }

        // Deserialize json response of GithubAPI to array of repos
        private List<GithubRepo> JsonToGithubRepos(String jsonResponseString)
        {
            List<GithubRepo> result = new List<GithubRepo>();

            try
            {
                JsonElement jsonResponseElement = JsonSerializer.Deserialize<JsonElement>(jsonResponseString);
                List<JsonElement> items = jsonResponseElement.GetProperty("items").EnumerateArray().ToList();

                items.ForEach(item =>
                {
                    result.Add(new GithubRepo()
                    {
                        Id = item.GetProperty("id").GetInt32(),
                        Name = item.GetProperty("name").GetString() ?? "",
                        Description = item.GetProperty("description").GetString() ?? "",
                        CreationDate = DateTime.Parse(item.GetProperty("created_at").GetString() ?? ""),
                        Url = item.GetProperty("html_url").GetString() ?? "",
                        StarsCount = item.GetProperty("stargazers_count").GetInt32(),
                        ForksCount = item.GetProperty("forks_count").GetInt32(),
                        Username = item.GetProperty("owner").GetProperty("login").GetString() ?? "",
                        AvatarUrl = item.GetProperty("owner").GetProperty("avatar_url").GetString() ?? "",
                        Language = item.GetProperty("language").GetString() ?? "",
                    });
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            return result;
        }

        // Returns the proper date string according the timeframe enum converted to GithubAPI required date format
        private string TimeframeEnumToDateString(Enums.Timeframe timeframe)
        {
            string result;

            try
            {
                switch (timeframe)
                {
                    case Enums.Timeframe.Day:
                        result = DateTime.Now.ToString("yyyy-MM-dd");
                        break;
                    case Enums.Timeframe.Week:
                        result = DateTime.Now.AddDays(-7).ToString("yyyy-MM-dd");
                        break;
                    case Enums.Timeframe.Month:
                        result = DateTime.Now.AddMonths(-1).ToString("yyyy-MM-dd");
                        break;
                    default:
                        result = DateTime.Now.ToString("yyyy-MM-dd");
                        break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }

            return result;
        }
    }
}