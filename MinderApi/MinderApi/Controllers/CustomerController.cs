using System.Data;
using CryptSharp;
using Microsoft.AspNetCore.Mvc;
using MinderApi.Models;
using MinderApi.Models.Database;

namespace MinderApi.Controllers {
    [Produces("application/json")]
    [Route("api/customers/")]
    public class CustomerController : Controller {
        private readonly MusicDatabaseEFContext musicDbContext;

        public CustomerController(MusicDatabaseEFContext mDbContext) {
            musicDbContext = mDbContext;
        }

        [HttpGet]
        [Route("{customerId}")]
        public IEnumerable<Customer> GetCustomerById(int customerId) {
            var chosenUser = from customer in musicDbContext.Customer
                             where customer.CustomerId == customerId
                             select customer;

            return chosenUser;
        }

        [HttpGet]
        [Route("matches/{customerId}")]
        public IEnumerable<Object> GetUserMatchesByCustomerId(int customerId)
        {
            var likedTracksByUser = from tr in musicDbContext.Track
                                    join li in musicDbContext.Like on tr.TrackId equals li.TrackId
                                    join cu in musicDbContext.Customer on li.CustomerId equals cu.CustomerId
                                    where li.CustomerId == customerId
                                    select new
                                    {
                                        TrackId = tr.TrackId,
                                    };

            var userMatches = (from cu in musicDbContext.Customer
                              join li in musicDbContext.Like on cu.CustomerId equals li.CustomerId
                              join tr in musicDbContext.Track on li.TrackId equals tr.TrackId
                              where li.CustomerId != customerId && likedTracksByUser.Any(query => query.TrackId == tr.TrackId)
                              group cu by new { 
                                  CustomerId = cu.CustomerId,
                                  FirstName = cu.FirstName,
                                  LastName = cu.LastName
                              } into userGroup
                              select new
                              {
                                  CustomerId = userGroup.Key.CustomerId,
                                  FirstName = userGroup.Key.FirstName,
                                  LastName = userGroup.Key.LastName
                              }).OrderBy(customer => customer.CustomerId);

            return userMatches;
        }

        [HttpGet]
        [Route("matches/tracks/{customerId}")]
        public IEnumerable<Object> GetUserTrackMatchesByCustomerId(int customerId)
        {
            var likedTracksByUser = from tr in musicDbContext.Track
                        join li in musicDbContext.Like on tr.TrackId equals li.TrackId
                        join cu in musicDbContext.Customer on li.CustomerId equals cu.CustomerId
                        where li.CustomerId == customerId
                        select new {
                            TrackId = tr.TrackId,
                        };

            var trackMatches = (from cu in musicDbContext.Customer
                          join li in musicDbContext.Like on cu.CustomerId equals li.CustomerId
                          join tr in musicDbContext.Track on li.TrackId equals tr.TrackId
                          join al in musicDbContext.Album on tr.AlbumId equals al.AlbumId
                          join ar in musicDbContext.Artist on al.ArtistId equals ar.ArtistId
                          join ge in musicDbContext.Genre on tr.GenreId equals ge.GenreId
                          where li.CustomerId != customerId && likedTracksByUser.Any(query => query.TrackId == tr.TrackId)
                          select new
                          {
                              CustomerId = cu.CustomerId,
                              TrackId = tr.TrackId,
                              TrackName = tr.Name,
                              TrackComposer = tr.Composer,
                              ArtistName = ar.Name,
                              AlbumTitle = al.Title,
                              GenreName = ge.Name
                          }).OrderBy(customer => customer.CustomerId);

            return trackMatches;
        }

        [HttpPost]
        public IActionResult AddCustomer([FromBody] Customer newCustomer) {
            try {
                newCustomer.Password = Crypter.Blowfish.Crypt(newCustomer.Password);
                musicDbContext.Customer.Add(newCustomer);
                musicDbContext.SaveChanges();

                var insertedCustomer = musicDbContext.Customer.Where(album => album.CustomerId == newCustomer.CustomerId);
                return new JsonResult(insertedCustomer);
            } catch (Exception e) {
                return new JsonResult(e);
            }
        }

        [HttpPut]
        [Route("{customerId}")]
        public IActionResult UpdateCustomer([FromBody] Customer customerModel, int customerId) {
            try {
                var updatedCustomer = (from customer in musicDbContext.Customer
                                      where customer.CustomerId == customerId
                                      select customer).ToList();

                bool isPasswordValid = false;
                if (updatedCustomer.Count == 1) {
                    isPasswordValid = (Crypter.CheckPassword(customerModel.Password, updatedCustomer.FirstOrDefault().Password.ToString()));

                    if (isPasswordValid) {
                        updatedCustomer.FirstOrDefault().FirstName = customerModel.FirstName;
                        updatedCustomer.FirstOrDefault().LastName = customerModel.LastName;
                        updatedCustomer.FirstOrDefault().Password = Crypter.Blowfish.Crypt(customerModel.Password);
                        updatedCustomer.FirstOrDefault().Company = customerModel.Company;
                        updatedCustomer.FirstOrDefault().Address = customerModel.Address;
                        updatedCustomer.FirstOrDefault().City = customerModel.City;
                        updatedCustomer.FirstOrDefault().State = customerModel.State;
                        updatedCustomer.FirstOrDefault().Country = customerModel.Country;
                        updatedCustomer.FirstOrDefault().PostalCode = customerModel.PostalCode;
                        updatedCustomer.FirstOrDefault().Phone = customerModel.Phone;
                        updatedCustomer.FirstOrDefault().Fax = customerModel.Fax;
                        updatedCustomer.FirstOrDefault().Email = customerModel.Email;

                        musicDbContext.SaveChanges();
                        return new JsonResult(updatedCustomer);
                    } else {
                        return new JsonResult("Password typed for user is invalid and hence the user information could not be updated.");
                    }
                } else {
                    return new JsonResult($"User with id {customerId} was not found");
                }

            } catch (Exception e) {
                return new JsonResult($"Unable to update customer/user: {e}");
            }
        }

        [HttpDelete]
        [Route("{customerId}")]
        public IActionResult DeleteCustomer(int customerId)
        {
            try {
                var customerToDelete = from customer in musicDbContext.Customer
                                       where customer.CustomerId == customerId
                                       select customer;

                musicDbContext.Customer.Remove(customerToDelete.First());
                musicDbContext.SaveChanges();
            } catch (Exception e) {
                return new JsonResult($"Unable to delete customer/user: {e}");
            }

            return new JsonResult($"Customer with id {customerId} deleted");
        }


    }
}
