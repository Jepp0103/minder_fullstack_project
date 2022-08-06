using MinderApi.Models.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Minder.UnitTests
{
    public class TestSetup
    {

        public static IConfiguration Configuration { get; set; }

        public static MusicDatabaseEFContext SetupTestDbContext()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");
            Configuration = builder.Build();
            var optionsBuilder = new DbContextOptionsBuilder<MusicDatabaseEFContext>().UseMySQL(Configuration.GetConnectionString("Credentials"));
            MusicDatabaseEFContext musicDbContext = new MusicDatabaseEFContext(optionsBuilder.Options);
            return musicDbContext;
        }
    }
}
