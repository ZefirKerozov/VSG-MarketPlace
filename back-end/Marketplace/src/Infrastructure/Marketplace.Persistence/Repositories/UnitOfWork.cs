using System.Data;
using System.Data.SqlClient;
using Marketplace.Application.Models.GenericRepository;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Persistence.Repositories;

public class UnitOfWork :IUnitOfWork
{
    private  IDbConnection _connection;
 
    public UnitOfWork(IConfiguration config)
    {
        _connection = new SqlConnection(config.GetConnectionString("SqlConnection"));
      _connection.Open();
    }
    public IDbConnection Connection { get => _connection; }

    public void Dispose()
    {
        Connection.Dispose();
    }
}