using MinderApi.Controllers;
using MinderApi.Models;
using Xunit;


namespace Minder.UnitTests
{
    public class AuthenticationControllerTest
    {   
        [Fact]
        public void TestValidateAdmin()
        {
            Admin admin = new Admin()
            {
                Password = "Jeppe1234"
            };

            var musicDbContext = TestSetup.SetupTestDbContext();
            AuthenticationController authController = new AuthenticationController(musicDbContext);

            // Act  
            bool actual = authController.ValidateAdmin(admin, 1);
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

            var musicDbContext = TestSetup.SetupTestDbContext();
            AuthenticationController authController = new AuthenticationController(musicDbContext);

            // Act  
            bool actual = authController.ValidateUser(customer);
            bool expected = true;

            // Assert  
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void TestGetCustomerById()
        {
            var musicDbContext = TestSetup.SetupTestDbContext();
            CustomerController customerController = new CustomerController(musicDbContext);
            int expected = 1;
            var actual = customerController.GetCustomerById(3).Count();

            Assert.Equal(expected, actual);
        }
    }
}