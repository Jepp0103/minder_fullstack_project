using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MySql.Data.MySqlClient;

namespace MinderApi.Controllers
{
    [Produces("application/json")]
    [Route("api/tracks")]
    [ApiController]
    public class TrackController : ControllerBase
    {
        private readonly IConfiguration Configuration;
        private readonly ChinookDatabase dbConnection;

        public TrackController(IConfiguration configuration)
        {
            Configuration = configuration;
            dbConnection = new ChinookDatabase(Configuration);
        }

        [HttpGet]
        public JsonResult GetTracks() {
            string query = "SELECT `name` FROM `track`;";
            var trackTable = dbConnection.SelectSQLQuery(query);
            return new JsonResult(trackTable);
        }

        [HttpPost]
        public JsonResult AddTrack([FromBody] Track trackModel) {
            string insertionQuery = @"
                INSERT INTO `track` (`Name`, `MediaTypeId`, `Composer`, `Milliseconds`, `UnitPrice`)
                VALUES(@Name, @MediaTypeId, @Composer, @Milliseconds, @UnitPrice);
            ";

            var insertedTrackId = dbConnection.InsertSQLQuery(insertionQuery, new[]
                {
                    new MySqlParameter("@Name", trackModel.Name),
                    new MySqlParameter("@MediaTypeId", trackModel.MediaTypeId),
                    new MySqlParameter("@Composer", trackModel.Composer),
                    new MySqlParameter("@Milliseconds", trackModel.MilliSeconds),
                    new MySqlParameter("@UnitPrice", trackModel.UnitPrice)
                }
            );

            string selectQuery = @"SELECT * FROM `track` WHERE TrackId = @TrackId";
            var response = dbConnection.SelectSQLQueryById(selectQuery, "@TrackId", insertedTrackId);

            return new JsonResult(response);
        }
    }   
}
