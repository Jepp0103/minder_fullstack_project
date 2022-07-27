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
        private readonly IConfiguration _configuration;

        public TrackController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult GetTracks() {
            string ConnectionString = "server=localhost;user=root;database=chinook_abridged;port=3306;password=password";
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
