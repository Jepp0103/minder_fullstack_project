using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MinderApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackController : ControllerBase
    {
        private readonly IConfiguration Configuration;

        public TrackController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet]
        public JsonResult GetTracks() {
            string serverStr = Configuration["Credentials:Server"];
            string userStr = Configuration["Credentials:User"];
            string databaseStr = Configuration["Credentials:Database"];
            string portStr = Configuration["Credentials:Port"];
            string passwordStr = Configuration["Credentials:Password"];
            string ConnectionString = $"server={serverStr};user={userStr};database={databaseStr};port={portStr};password={passwordStr}";

            MySqlConnection connection = new MySqlConnection(ConnectionString);
            connection.Open();
            MySqlCommand trackCommand = new MySqlCommand("SELECT name FROM track;", connection);
            MySqlDataReader trackReader = trackCommand.ExecuteReader();
            DataTable trackTable = new DataTable();
            trackTable.Load(trackReader);

            trackReader.Close();
            trackCommand.Dispose();
            connection.Close();

            return new JsonResult(trackTable);
        }
    }
}
