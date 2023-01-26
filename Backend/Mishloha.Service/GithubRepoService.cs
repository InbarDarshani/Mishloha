using Mishloha.Models;
using System.Text.Json;

namespace Mishloha.Service
{
    public class GithubRepoService
    {
        private static HttpClient httpClient;
 
        public GithubRepoService() 
        {
            httpClient = new HttpClient(); 
            httpClient.BaseAddress = new Uri("https://api.github.com/search/repositories");
            httpClient.DefaultRequestHeaders.Add("User-Agent", "C# App");   //Adding User-Agent header as default due to GitHub API requirement
        }

        public List<GithubRepo> SearchByTimeframe(Enums.Timeframe timeframe, int page)
        {
            List<GithubRepo> result = new List<GithubRepo>();
            string requiedTimeFrame;

            switch (timeframe)
            {
                case Enums.Timeframe.Day:
                    requiedTimeFrame = DateTime.Now.ToString("yyyy-MM-dd");
                    break;
                case Enums.Timeframe.Week:
                    requiedTimeFrame = DateTime.Now.AddDays(-7).ToString("yyyy-MM-dd");
                    break;
                case Enums.Timeframe.Month:
                    requiedTimeFrame = DateTime.Now.AddMonths(-1).ToString("yyyy-MM-dd");
                    break;
                default:
                    requiedTimeFrame = DateTime.Now.ToString("yyyy-MM-dd");     //TODO: ??
                    break;
            }
            string getUrlString = $"?sort=stars&order=desc&page={page}&per_page=10&q=created:>={requiedTimeFrame}";

            try
            {
                using HttpResponseMessage httpResponse = httpClient.GetAsync(getUrlString).Result;
                //TODO: ADD? httpResponse.EnsureSuccessStatusCode(); // throws if not 200-299

                // Deserialize json to the object array of repos
                var jsonResponseString = httpResponse.Content.ReadAsStringAsync().Result;
                var jsonResponseElement = JsonSerializer.Deserialize<JsonElement>(jsonResponseString);
                List<JsonElement> items = jsonResponseElement.GetProperty("items").EnumerateArray().ToList();

                //TODO: Create CTOR\func for deserialise?
                items.ForEach(item => {
                    GithubRepo temp = new GithubRepo()
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
                    };
                    result.Add(temp);
                });
            }
            catch (Exception ex)
            {
                //TODO: log error
                Console.WriteLine(ex.ToString());
                throw;
            }

            return result;
        }


    }
}