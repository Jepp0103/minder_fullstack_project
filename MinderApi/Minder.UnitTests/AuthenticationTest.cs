using MinderApi.Controllers;
using MinderApi.Models;
using MinderApi.Models.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace Minder.UnitTests
{
    public class AuthenticationTest
    {

        public IConfiguration Configuration { get; set; }

        public MusicDatabaseEFContext SetupTestDbContext()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");
            Configuration = builder.Build();
            var optionsBuilder = new DbContextOptionsBuilder<MusicDatabaseEFContext>().UseMySQL(Configuration.GetConnectionString("Credentials"));
            MusicDatabaseEFContext musicDbContext = new MusicDatabaseEFContext(optionsBuilder.Options);
            return musicDbContext;
        }

        [Fact]
        public void TestValidateAdmin()
        {
            Admin admin = new Admin()
            {
                Password = "admin"
            };

            var musicDbContext = SetupTestDbContext();
            AuthenticationController authController = new AuthenticationController(musicDbContext);

            // Act  
            bool actual = authController.ValidateAdmin(admin);
            bool expected = true;

            // Assert  
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void TestValidateUser()
        {
            //Arrange
            Customer customer = new Customer()
            {
                FirstName = "Jeppe Nannestad",
                LastName = "Dyekjær",
                Password = "Jeppe1234",
                Company = "2",
                Address = "Jeppevej 2",
                City = "Jeppeby",
                State = "Jeppeøen",
                Country = "Jeppeland",
                PostalCode = "1234",
                Phone = "12345678",
                Fax = "2332",
                Email = "jeppe@mail.com"
            };

            var musicDbContext = SetupTestDbContext();
            AuthenticationController authController = new AuthenticationController(musicDbContext);

            // Act  
            bool actual = authController.ValidateUser(customer);
            bool expected = true;

            // Assert  
            Assert.Equal(expected, actual);
        }
    }
}