using System.Data;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;
using Microsoft.EntityFrameworkCore;

namespace MinderApi.Controllers
{
    public class CustomerController : Controller
    {
        private readonly MusicDatabaseEFContext musicDbContext;
        private readonly ILogger<AlbumController> Logger;
        public IActionResult GetUserById()
        {
            return new JsonResult("Not implemented yet.");
        }
    }
}
