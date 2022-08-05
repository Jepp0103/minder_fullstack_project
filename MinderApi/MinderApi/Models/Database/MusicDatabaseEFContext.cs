using Microsoft.EntityFrameworkCore;

namespace MinderApi.Models.Database
{
    public class MusicDatabaseEFContext : DbContext
    {
        //Entity framework setup.
        public MusicDatabaseEFContext(DbContextOptions<MusicDatabaseEFContext> options) : base(options)
        {
        }

        public DbSet<Album> Album { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Admin> Admin { get; set; }

    }
}
