using System.Data;
using System.Data.SqlClient;
using Marketplace.Application.Models.GenericRepository;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Persistence.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private IDbConnection _connection;

    private IDbTransaction _transaction;

    public UnitOfWork(IConfiguration config)
    {
        _connection = new SqlConnection(config.GetConnectionString("DefaultConnection"));
        _connection.Open();
        _transaction = _connection.BeginTransaction();
    }

    public IDbConnection Connection
    {
        get => _connection;
    }

    public IDbTransaction Transaction
    {
        get => _transaction;
    }

    public void Dispose()
    {
        if (_connection != null)
        {
            _connection.Close();
            _connection.Dispose();
        }

        if (_transaction != null)
        {
            _transaction.Dispose();
        }
    }
}