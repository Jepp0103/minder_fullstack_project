using Microsoft.EntityFrameworkCore;

namespace MinderApi.Models.Database
{
    public class MusicDatabaseEFContext : DbContext
    {
        //Entity framework setup.
        public MusicDatabaseEFContext(DbContextOptions<MusicDatabaseEFContext> options) : base(options)
        {
        }

        public DbSet<Admin> Admin { get; set; }
        public DbSet<Album> Album { get; set; }
        public DbSet<Artist> Artist { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Dislike> Dislike { get; set; }
        public DbSet<Genre> Genre { get; set; }
        public DbSet<Like> Like { get; set; }
        public DbSet<Track> Track { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<CustomerRoom> Customer_Room { get; set; }

    }
}
