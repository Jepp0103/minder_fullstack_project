using System.Data;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;


namespace MinderApi.Controllers
{
    [Produces("application/json")]
    [Route("api/likes")]
    [ApiController]
    public class LikeController : Controller {
        private readonly MusicDatabaseEFContext musicDbContext;

        public LikeController(MusicDatabaseEFContext mDbContext) {
            musicDbContext = mDbContext;
        }

        [HttpPost]
        public IActionResult LikeTrack([FromBody] Like newLike) {
            try {
                musicDbContext.Like.Add(newLike);
                musicDbContext.SaveChanges();
                var lastLike = musicDbContext.Like.Where(like => like.LikeId == newLike.LikeId);
                return new JsonResult(lastLike);
            } catch (Exception e) {
                return new JsonResult("Error liking track: " + e);
            }
        }

        [HttpDelete]
        [Route("{likeId}")]
        public IActionResult DeleteLike(int likeId) {
            try {
                Like likeToDelete = musicDbContext.Like.Single(like => like.LikeId == likeId);
                musicDbContext.Like.Remove(likeToDelete);
                musicDbContext.SaveChanges();
                return new JsonResult($"Liked track deleted with id: {likeId}");
            } catch (Exception e) {
                return new JsonResult($"An error occured deleting the liked track: {e}");
            }
        }
    }
}
