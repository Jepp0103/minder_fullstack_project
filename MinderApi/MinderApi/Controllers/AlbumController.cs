using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.Collections.Specialized;
using Newtonsoft.Json.Serialization;

using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;

namespace MinderApi.Controllers
{
    [Produces("application/json")]
    [Route("api/albums")]
    [ApiController]
    public class AlbumController : Controller
    {
        private IConfiguration Configuration;
        private MusicDatabaseEF musicDatabase;
        private IServiceCollection Service;

        public AlbumController(IConfiguration configuration, IServiceCollection service, DbContextOptions<MusicDatabaseEF> options)
        {
            Configuration = configuration;
            musicDatabase = new MusicDatabaseEF(Configuration, service, options);
        }

        [HttpGet]
        public JsonResult getAlbums()
        {
            var albums = musicDatabase.Albums.ToList();

            return new JsonResult(albums);
        }
    }
}
