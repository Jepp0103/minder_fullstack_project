using System.Data;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;
using Microsoft.EntityFrameworkCore;

namespace MinderApi.Controllers
{
    [Produces("application/json")]
    [Route("api/messages")]
    [ApiController]
    public class MessageController : Controller
    {
        private readonly MusicDatabaseEFContext musicDbContext;
        public MessageController(MusicDatabaseEFContext mDbContext)
        {
            musicDbContext = mDbContext;
        }

        [Route("{roomId}")]
        [HttpGet]
        public IEnumerable<Object> GetMessagesByRoomId(int roomId) {
            var albums = (musicDbContext.Message
                        .Join(musicDbContext.Customer,
                        message => message.CustomerId,
                        customer => customer.CustomerId,
                        (message, customer) => new { 
                            message.MessageId, 
                            message.Text, 
                            message.RoomId, 
                            message.CustomerId, 
                            customer.FirstName, 
                            customer.LastName
                        }))
                        .Where(message => message.RoomId == roomId)
                        .OrderBy(message => message.MessageId);
            return albums;
        }
    }
}
