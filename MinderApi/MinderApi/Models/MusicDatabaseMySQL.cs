using System.Data;
using MySql.Data.MySqlClient;

namespace MinderApi.Models
{
    public class MusicDatabaseMySQL
    {
        private readonly IConfiguration Configuration;

        public MusicDatabaseMySQL(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public MySqlConnection ConnectToDB()
        {
            string ConnectionString = Configuration.GetConnectionString("Credentials");
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

        public DataTable SelectSQLQueryById(string query, string parameterId, long parameterIdValue) {
            var connection = ConnectToDB();
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue(parameterId, parameterIdValue);
            MySqlDataReader reader = command.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(reader);

            DisconnectDB(reader, command, connection);
            return table;
        }

        public DataTable SearchSQLQuery(string query, string searchString)
        {
            var connection = ConnectToDB();
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@SearchWord", $"%{searchString}%");
            MySqlDataReader reader = command.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(reader);

            DisconnectDB(reader, command, connection);
            return table;
        }


        public DataTable InsertOrUpdateSQLQuery(string query, MySqlParameter[] parameters, string tableName, string idName, int argId = 0) {
            var connection = ConnectToDB();
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddRange(parameters);
            MySqlDataReader reader = command.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(reader);

            string idNameValue = "@" + idName;
            string selectQuery = @$"SELECT * FROM `{tableName}` WHERE `{idName}` = {idNameValue}";

            //Validates the id if it is an insertion query (declares the last inserted id) or an update query.
            long columnId = argId == 0 ? command.LastInsertedId : argId;
            var response = SelectSQLQueryById(selectQuery, idNameValue, columnId);

            DisconnectDB(reader, command, connection);
            return response;
        }

        public string DeleteQuery(string query, int idParam, string idName, string tableName)
        {
            var connection = ConnectToDB();
            MySqlCommand command = new MySqlCommand(query, connection);
            string idNameValue = "@" + idName;
            command.Parameters.AddWithValue(idNameValue, idParam);
            MySqlDataReader reader = command.ExecuteReader();
            DataTable table = new DataTable();
            table.Load(reader);

            string response = $"Item from {tableName} with id {idParam} deleted.";
            DisconnectDB(reader, command, connection);
            return response;
        }
    }
}
