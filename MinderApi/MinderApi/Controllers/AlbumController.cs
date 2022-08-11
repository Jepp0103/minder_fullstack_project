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

        public AlbumController(MusicDatabaseEFContext mDbContext)
        {
            musicDbContext = mDbContext;
        }

        [HttpGet]
        public IEnumerable<Object> GetAlbums() {
            var albums = (musicDbContext.Album
                        .Join(musicDbContext.Artist,
                        album => album.ArtistId,
                        artist => artist.ArtistId,
                        (album, artist) => new { album.AlbumId, album.Title, ArtistName = artist.Name }))
                        .OrderBy(album => album.Title);

            return albums;
        }

        [Route("{albumId}")]
        [HttpGet]
        public IEnumerable<Album> GetAlbumById(int albumId) {
            var album = musicDbContext.Album.Where(album => album.AlbumId == albumId);
            return album;
        }

        [Route("search")]
        [HttpGet]
        public IEnumerable<Object> SearchAlbums([FromQuery] string searchString) {
            var albums = (from album in musicDbContext.Album
                          join artist in musicDbContext.Artist
                          on album.ArtistId equals artist.ArtistId
                          where album.ArtistId == artist.ArtistId && album.Title.Contains(searchString)
                          select new { album.AlbumId, album.Title, ArtistName = artist.Name });

            return albums;
        }

        [HttpPost]
        public IActionResult AddAlbum([FromBody] Album newAlbum) {
            try {
                musicDbContext.Album.Add(newAlbum);
                musicDbContext.SaveChanges();

                var insertedAlbum = musicDbContext.Album.Where(album => album.AlbumId == newAlbum.AlbumId);
                return new JsonResult(insertedAlbum);
            } catch (Exception e) {
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
