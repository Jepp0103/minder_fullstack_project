using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.Collections.Specialized;

using Newtonsoft.Json.Serialization;
using MinderApi.Models;

namespace MinderApi.Models
{
    public class MusicDatabaseEF : DbContext
    {
        private readonly IConfiguration Configuration;
        private readonly IServiceCollection Service;

        public MusicDatabaseEF(IConfiguration configuration, IServiceCollection service, DbContextOptions<MusicDatabaseEF> options) : base(options)
        {
            Configuration = configuration;
            Service = service;
            ConnectToEfDB(Service);
        }

        public DbSet<Album> Albums  { get; set; }

        //Adding entity framework db as a common way of using a db in the .NET framework.
        public void ConnectToEfDB(IServiceCollection services)
        {
            services.AddDbContext<MusicDatabaseEF>(options => options.UseMySQL(Configuration.GetConnectionString("Credentials")));
        }
    }
}
