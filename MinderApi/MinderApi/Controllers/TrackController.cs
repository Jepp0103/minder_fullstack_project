using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using System.Data;

namespace MinderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackController : ControllerBase
    {
        private readonly IConfiguration Configuration;
        private readonly DatabaseConnection dbConnection;

        public TrackController(IConfiguration configuration)
        {
            Configuration = configuration;
            dbConnection = new DatabaseConnection(Configuration);
        }

        [HttpGet]
        public JsonResult GetTracks() {
            DataTable trackTable = dbConnection.ExecuteSQLQuery("SELECT name FROM track;");
            return new JsonResult(trackTable);
        }
    }
}
