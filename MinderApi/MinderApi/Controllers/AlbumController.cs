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
        private readonly MusicDatabaseEFContext musicDatabase;
        private readonly ILogger<AlbumController> Logger;

        public AlbumController(ILogger<AlbumController> logger, MusicDatabaseEFContext mDatabase)
        {
            Logger = logger;
            musicDatabase = mDatabase;
        }

        [HttpGet]
        public IActionResult getAlbums()
        {
            var albums = musicDatabase.Album.ToList();

            return new JsonResult(albums);
        }
    }
}
