using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MySql.Data.MySqlClient;

namespace MinderApi.Controllers
{
    [Produces("application/json")]
    [Route("api/artists")]
    [ApiController]
    public class ArtistController : ControllerBase
    {

        private readonly IConfiguration Configuration;
        private readonly MusicDatabase musicDatabase;

        public ArtistController(IConfiguration configuration)
        {
            Configuration = configuration;
            musicDatabase = new MusicDatabase(Configuration);
        }

        [HttpGet]
        public JsonResult GetArtists()
        {
            string query = "SELECT `name` FROM `artist`;";
            var artistTable = musicDatabase.SelectSQLQuery(query);
            return new JsonResult(artistTable);
        }

        [Route("search")]
        [HttpGet]
        public JsonResult SearchArtists([FromQuery] string searchString)
        {
            string query = @"
                            SELECT `Name` FROM `artist` 
                            WHERE `Name` LIKE @SearchWord;
            ";
            var artistTable = musicDatabase.SearchSQLQuery(query, searchString);
            return new JsonResult(artistTable);
        }

        [HttpPost]
        public JsonResult AddArtist([FromBody] Artist artistModel)
        {
            string insertionQuery = @"
                INSERT INTO `artist` (`Name`)
                VALUES(@Name);
            ";

            var response = musicDatabase.InsertOrUpdateSQLQuery(insertionQuery, new[]
                {
                    new MySqlParameter("@Name", artistModel.Name)
                },
                "artist",
                "ArtistId"
            );

            return new JsonResult(response);
        }

        [Route("{artistId}")]
        [HttpPut]
        public JsonResult UpdateArtist([FromBody] Artist artistModel, int artistId)
        {
            string updateQuery = @$"
                UPDATE `artist` 
                SET `Name` = @Name
                WHERE `ArtistID` = @ArtistId
                ;
            ";

            var response = musicDatabase.InsertOrUpdateSQLQuery(updateQuery, new[]
                {
                    new MySqlParameter("@Name", artistModel.Name),
                    new MySqlParameter("@ArtistId", artistId)
                },
                "artist",
                "ArtistId",
                artistId
            );

            return new JsonResult(response);
        }

        [Route("{artistId}")]
        [HttpDelete]
        public JsonResult DeleteArtist(int artistId)
        {
            string deleteQuery = @$"
                DELETE FROM `artist` 
                WHERE ArtistId = @ArtistId
                ;
            ";

            var response = musicDatabase.DeleteQuery(deleteQuery, artistId, "ArtistId", "artist");
            return new JsonResult(response);
        }
    }
}
