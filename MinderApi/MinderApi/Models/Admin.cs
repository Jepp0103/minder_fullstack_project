using Microsoft.EntityFrameworkCore;

namespace MinderApi.Models
{
    //The admin table in the db I decided to practice with only consists of a password.
    [Keyless]
    public class Admin
    {
        public string? Password { get; set; }
    }
}
