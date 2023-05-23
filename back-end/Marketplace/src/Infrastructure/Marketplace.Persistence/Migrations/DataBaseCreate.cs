using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Persistence.Migrations;

 public static class DatabaseCreate
    {
        public static void Create(IConfiguration configuration)
        {
            var marketplaceConnectionString = new SqlConnectionStringBuilder(configuration.GetConnectionString("DefaultConnection"));
            string dbName = marketplaceConnectionString.InitialCatalog;

            var parameters = new DynamicParameters();
            parameters.Add("name", dbName);

            using var connection = new SqlConnection(configuration.GetConnectionString("SqlConnectionMigration"));
            var records = connection.Query("SELECT * FROM sys.databases WHERE name = @name",
                parameters);

            if (records.Any() == false)
            {
                connection.Execute($"CREATE DATABASE {dbName}");
            }
        }
    }
