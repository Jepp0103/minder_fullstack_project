using System.Data;
using MySql.Data.MySqlClient;

namespace MinderApi.Models
{
    public class ChinookDatabase
    {
        private readonly IConfiguration Configuration;

        public ChinookDatabase(IConfiguration configuration)
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

        public void DisconnectDB(MySqlDataReader reader, MySqlCommand command, MySqlConnection connection)
        {
            reader.Close();
            command.Dispose();
            connection.Close();
        }

        public DataTable SelectSQLQuery(string query) { 
            var connection = ConnectToDB();
            MySqlCommand command = new MySqlCommand(query, connection);
            MySqlDataReader reader = command.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(reader);
            DisconnectDB(reader, command, connection);
            return table;
        }

        public DataTable SelectSQLQueryById(string query, string parameterId, long parameterValue) {
            var connection = ConnectToDB();
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue(parameterId, parameterValue);
            MySqlDataReader reader = command.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(reader);
            DisconnectDB(reader, command, connection);
            return table;
        }

        public long InsertSQLQuery(string query, MySqlParameter[] parameters) {
            var connection = ConnectToDB();
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddRange(parameters);
            MySqlDataReader reader = command.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(reader);
            long id = command.LastInsertedId;
            DisconnectDB(reader, command, connection);
            return id;
        }
    }
}
