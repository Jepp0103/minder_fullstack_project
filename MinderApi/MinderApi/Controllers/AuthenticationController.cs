using System.Data;
using CryptSharp;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;

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
        public IEnumerable<Admin> GetAdminCredentials(int adminId)
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
            var adminToValidate = (from admin in musicDbContext.Admin
                                            where admin.Username == adminModel.Username
                                            select admin).ToList();

            var storedPassword = adminToValidate.FirstOrDefault().Password.ToString();

            if (adminToValidate.Count == 1) {
                bool isPasswordValid = Crypter.CheckPassword(adminModel.Password, storedPassword);
                return isPasswordValid;
            } else {
                return false;
            }           
        }

        [HttpPost]
        [Route("admin")]
        public IActionResult AddAdmin([FromBody] Admin newAdmin)
        {
            try
            {
                newAdmin.Password = Crypter.Blowfish.Crypt(newAdmin.Password);
                musicDbContext.Admin.Add(newAdmin);
                musicDbContext.SaveChanges();

                var insertedAdmin = musicDbContext.Admin.Where(admin => admin.AdminId == newAdmin.AdminId);
                return new JsonResult(insertedAdmin);
            }
            catch (Exception e)
            {
                return new JsonResult(e);
            }
        }

        [HttpPut("admin/{adminId}")]
        public IActionResult UpdateAdmin([FromBody] Admin adminModel, int adminId)
        {
            var adminToUpdate = (from admin in musicDbContext.Admin
                                 where admin.AdminId == adminId
                                 select admin).FirstOrDefault();

            adminToUpdate.Password = Crypter.Blowfish.Crypt(adminModel.Password);
            musicDbContext.SaveChanges();

            return new JsonResult(adminToUpdate);
        }
    }
}
