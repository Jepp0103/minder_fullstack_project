using System.Data;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;
using Microsoft.EntityFrameworkCore;


namespace MinderApi.Controllers
{
    [Produces("application/json")]
    [Route("api/dislikes")]
    [ApiController]
    public class DislikeController : Controller
    {
        private readonly MusicDatabaseEFContext musicDbContext;

        public DislikeController(MusicDatabaseEFContext mDbContext)
        {
            musicDbContext = mDbContext;
        }

        [HttpPost]
        public IActionResult DislikeTrack([FromBody] Dislike newDislike)
        {
            try
            {
                musicDbContext.Dislike.Add(newDislike);
                musicDbContext.SaveChanges();
                var lastDislike = musicDbContext.Dislike.Where(dislike => dislike.DislikeId == newDislike.DislikeId);
                return new JsonResult(lastDislike);
            }
            catch (Exception e)
            {
                return new JsonResult("Error disliking track: " + e);
            }
        }
    }
}
