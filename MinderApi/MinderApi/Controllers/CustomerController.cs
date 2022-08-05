using System.Data;
using CryptSharp;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;

namespace MinderApi.Controllers
{
    [Produces("application/json")]
    [Route("api/customers/")]
    public class CustomerController : Controller
    {
        private readonly MusicDatabaseEFContext musicDbContext;

        public CustomerController(MusicDatabaseEFContext mDbContext)
        {
            musicDbContext = mDbContext;
        }

        [HttpGet]
        [Route("{customerId}")]
        public IEnumerable<Customer> GetCustomerById(int customerId)
        {
            var chosenUser = from customer in musicDbContext.Customer
                             where customer.CustomerId == customerId
                             select customer;

            return chosenUser;
        }

        [HttpPost]
        public IActionResult AddCustomer([FromBody] Customer newCustomer)
        {
            try
            {
                newCustomer.Password = Crypter.Blowfish.Crypt(newCustomer.Password);
                musicDbContext.Customer.Add(newCustomer);
                musicDbContext.SaveChanges();

                var insertedCustomer = musicDbContext.Customer.Where(album => album.CustomerId == newCustomer.CustomerId);
                return new JsonResult(insertedCustomer);
            }
            catch (Exception e)
            {
                return new JsonResult(e);
            }
        }

        [HttpPut]
        [Route("{customerId}")]
        public IActionResult UpdateCustomer([FromBody] Customer customerModel, int customerId)
        {
            try
            {
                var updatedCustomer = from customer in musicDbContext.Customer
                                      where customer.CustomerId == customerId
                                      select customer;
                updatedCustomer.First().FirstName = customerModel.FirstName;
                updatedCustomer.First().LastName = customerModel.LastName;
                updatedCustomer.First().Password = customerModel.Password;
                updatedCustomer.First().Company = customerModel.Company;
                updatedCustomer.First().Address = customerModel.Address;
                updatedCustomer.First().City = customerModel.City;
                updatedCustomer.First().State = customerModel.State;
                updatedCustomer.First().Country = customerModel.Country;
                updatedCustomer.First().PostalCode = customerModel.PostalCode;
                updatedCustomer.First().Phone = customerModel.Phone;
                updatedCustomer.First().Fax = customerModel.Fax;
                updatedCustomer.First().Email = customerModel.Email;

                musicDbContext.SaveChanges();
                return new JsonResult(updatedCustomer);
            }
            catch (Exception e)
            {
                return new JsonResult($"Unable to update customer/user: {e}");
            }
        }

        [HttpDelete]
        [Route("{customerId}")]
        public IActionResult DeleteCustomer(int customerId)
        {
            try
            {
                var customerToDelete = from customer in musicDbContext.Customer
                                       where customer.CustomerId == customerId
                                       select customer;

                musicDbContext.Customer.Remove(customerToDelete.First());
                musicDbContext.SaveChanges();
            }
            catch (Exception e)
            {
                return new JsonResult($"Unable to delete customer/user: {e}");
            }

            return new JsonResult($"Customer with id {customerId} deleted");
        }
    }
}
