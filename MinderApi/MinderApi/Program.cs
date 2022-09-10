using Newtonsoft.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using MinderApi.Models.Database;
using MinderApi.HubConfig;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllheaders", 
            builder => builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
            );
});

builder.Services.AddSignalR(options => {
    options.EnableDetailedErrors = true;
});

//Json serializer
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options=>
options.SerializerSettings.ReferenceLoopHandling=Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(options=>options.SerializerSettings.ContractResolver=
    new DefaultContractResolver());

//Connecting to database using entity framework.
var connectionString = builder.Configuration.GetConnectionString("Credentials");
builder.Services.AddDbContext<MusicDatabaseEFContext>(options =>
{
    options.UseMySQL(connectionString, myOptions => ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

app.UseCors("AllowAllheaders");

app.UseRouting();

app.UseEndpoints(endpoints => {
    endpoints.MapControllers();
    endpoints.MapHub<MyHub>("/message");
});

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
