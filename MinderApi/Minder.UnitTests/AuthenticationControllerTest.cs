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
            //Arrange
            Admin admin = new Admin()
            {
               Username = "Jeppend",
               Password = "Jeppe1234"
            };

            var musicDbContext = TestSetup.SetupTestDbContext();
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

            var musicDbContext = TestSetup.SetupTestDbContext();
            AuthenticationController authController = new AuthenticationController(musicDbContext);

            // Act  
            Dictionary<int, bool> expected = new Dictionary<int, bool>
            {
                {69, true}
            };

            var actual = authController.ValidateUser(customer);
        

            // Assert  
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void TestGetCustomerById()
        {
            //Arrange
            var musicDbContext = TestSetup.SetupTestDbContext();
            CustomerController customerController = new CustomerController(musicDbContext);

            //Act
            int expected = 1;
            var actual = customerController.GetCustomerById(3).Count();

            //Assert
            Assert.Equal(expected, actual);
        }
    }
}