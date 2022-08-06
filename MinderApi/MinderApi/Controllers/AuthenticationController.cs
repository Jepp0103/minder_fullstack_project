using System.Data;
using CryptSharp;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;
using Microsoft.EntityFrameworkCore;
namespace MinderApi.Controllers
{
    [Produces("application/json")]
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly MusicDatabaseEFContext musicDbContext;

        public AuthenticationController(MusicDatabaseEFContext mDbContext)
        {
            musicDbContext = mDbContext;
        }

        [HttpGet]
        [Route("admin")]
        public IEnumerable<Admin> GetAdminCredentials()
        {
            var adminUser = from admin in musicDbContext.Admin
                            select admin;

            return adminUser;
        }

        [HttpPost]
        [Route("uservalidation")]
        public bool ValidateUser([FromBody] Customer customerModel)
        {
            var userToValidate = (from customer in musicDbContext.Customer
                                  where customer.Email == customerModel.Email
                                  select customer).ToList();

            bool isPasswordValid = false;
            if (userToValidate.Count == 1) { 
                isPasswordValid = (Crypter.CheckPassword(customerModel.Password, userToValidate.FirstOrDefault().Password.ToString()));
            }

            bool isUserValid = isPasswordValid ? true : false;
            return isUserValid;
        }


        [HttpPost]
        [Route("adminvalidation")]
        public bool ValidateAdmin([FromBody] Admin adminModel)
        {
            string storedHashedPassword = (from admin in musicDbContext.Admin
                                           select new { admin.Password }).FirstOrDefault().Password.ToString();

            bool isPasswordValid = Crypter.CheckPassword(adminModel.Password, storedHashedPassword);
            return isPasswordValid;
        }

        [HttpPut("updateadmin")]
        public void UpdateAdminPassword(int id, [FromBody] Admin adminModel)
        {
        }

    }
}
