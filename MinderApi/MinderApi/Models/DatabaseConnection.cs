using System.Data;
using MySql.Data.MySqlClient;

namespace MinderApi.Models
{
    public class DatabaseConnection
    {
        private readonly IConfiguration Configuration;

        public DatabaseConnection(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public MySqlConnection ConnectToDB()
        {
            string serverStr = Configuration["Credentials:Server"];
            string userStr = Configuration["Credentials:User"];
            string databaseStr = Configuration["Credentials:Database"];
            string portStr = Configuration["Credentials:Port"];
            string passwordStr = Configuration["Credentials:Password"];
            string ConnectionString = $"server={serverStr};user={userStr};database={databaseStr};port={portStr};password={passwordStr}";

            MySqlConnection connection = new MySqlConnection(ConnectionString);
            connection.Open();

            return connection;
        }

        public DataTable ExecuteSQLQuery(string sqlCommand) { 
            var connection = ConnectToDB();
            MySqlCommand command = new MySqlCommand(sqlCommand, connection);
            MySqlDataReader reader = command.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(reader);
            reader.Close();
            command.Dispose();
            connection.Close();

            return table;
        }
    }
}
