using Microsoft.EntityFrameworkCore;
namespace MinderApi.Models
{
    public class MusicDatabaseEFContext : DbContext
    {   
        //Entity framework setup.
        public MusicDatabaseEFContext(DbContextOptions<MusicDatabaseEFContext> options) : base(options) { 
        }

        public DbSet<Album> Album { get; set; }
    }
}
