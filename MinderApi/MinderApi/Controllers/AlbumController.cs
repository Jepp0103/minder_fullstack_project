using System.Data;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;
using Microsoft.EntityFrameworkCore;


namespace MinderApi.Controllers
{
    [Produces("application/json")]
    [Route("api/albums")]
    [ApiController]
    public class AlbumController : Controller
    {
        private readonly MusicDatabaseEFContext musicDbContext;
        private readonly ILogger<AlbumController> Logger;

        public AlbumController(ILogger<AlbumController> logger, MusicDatabaseEFContext mDbContext)
        {
            Logger = logger;
            musicDbContext = mDbContext;
        }

        [HttpGet]
        public IActionResult GetAlbums() {
            var albums = musicDbContext.Album.ToList();
            return new JsonResult(albums);
        }

        [Route("{albumId}")]
        [HttpGet]
        public IActionResult GetAlbumById(int albumId) {
            var album = musicDbContext.Album.Where(album => album.AlbumId == albumId);
            return new JsonResult(album);
        }

        [Route("search")]
        [HttpGet]
        public IActionResult SearchAlbums([FromQuery] string searchString) {
            var albums = musicDbContext.Album.Where(album => album.Title.Contains(searchString));
            return new JsonResult(albums);
        }

        [HttpPost]
        public IActionResult AddAlbum([FromBody] Album newAlbum) {
            try {
                musicDbContext.Album.Add(newAlbum);
                musicDbContext.SaveChanges();

                var insertedAlbum = musicDbContext.Album.Where(album => album.AlbumId == newAlbum.AlbumId);
                return new JsonResult(insertedAlbum);
            }
            catch (Exception e) {
                return new JsonResult(e);
            }
        }

        [HttpPut]
        [Route("{albumId}")]
        public IActionResult UpdateAlbum([FromBody] Album albumModel, int albumId) {
            try {
                Album albumToUpdate = musicDbContext.Album.Single(album => album.AlbumId == albumId);
                albumToUpdate.Title = albumModel.Title;
                albumToUpdate.ArtistId = albumModel.ArtistId;
                musicDbContext.SaveChanges();

                var updatedAlbum = musicDbContext.Album.Where(album => album.AlbumId == albumId);
                return new JsonResult(updatedAlbum);

            } catch (DbUpdateException e) {
                return new JsonResult($"An error occured while updating the album. Update of child records is not possible, " +
                    $" which may be the problem: {e}");
            }
        }

        [HttpDelete]
        [Route("{albumId}")]
        public IActionResult DeleteAlbum(int albumId) {
            try {
                Album albumToDelete = musicDbContext.Album.Single(album => album.AlbumId == albumId);
                musicDbContext.Album.Remove(albumToDelete);
                musicDbContext.SaveChanges();
                return new JsonResult($"Album deleted with id: {albumId}");

            } catch (Exception e) {
                return new JsonResult($"Album cannot be deleted, since the album contains child records: {e}");
            }
        }
    }
}
