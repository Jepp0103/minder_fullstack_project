using System.Data;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;
using Microsoft.EntityFrameworkCore;


namespace MinderApi.Controllers
{
    [Produces("application/json")]
    [Route("api/likes")]
    [ApiController]
    public class LikeController : Controller
    {
        private readonly MusicDatabaseEFContext musicDbContext;

        public LikeController(MusicDatabaseEFContext mDbContext)
        {
            musicDbContext = mDbContext;
        }

        [HttpPost]
        public IActionResult LikeTrack([FromBody] Like newLike)
        {
            try
            {
                musicDbContext.Like.Add(newLike);
                musicDbContext.SaveChanges();
                var lastLike = musicDbContext.Like.Where(like => like.LikeId == newLike.LikeId);
                return new JsonResult(lastLike);
            }
            catch (Exception e)
            {
                return new JsonResult("Error liking track: " + e);
            }
        }
    }
}
