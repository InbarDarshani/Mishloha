using Microsoft.AspNetCore.Mvc;
using Mishloha.Models;
using Mishloha.Service;

namespace MishlohaApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GithubRepoController : ControllerBase
    {
        private readonly GithubRepoService githubRepoService;

        public GithubRepoController()
        {
            githubRepoService = new GithubRepoService();
        }

        // GET api/<GithubRepoController>/1
        [HttpGet]
        public IActionResult Get(Enums.Timeframe timeframe, int page)    //TODO: Check enum out of range
        {
            try
            {
                List<GithubRepo> result = githubRepoService.SearchByTimeframe(timeframe, page);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }
    }
}
