using System.Data.SqlClient;
using Dapper;
using Marketplace.Application.Models.OrderModels.Dtos;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Persistence.Repositories;

public class OrdersRepository :IOrdersRepository
{
    private readonly string _connectionString;

    public OrdersRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("SqlConnection");
    }

    public List<GetOrdersDto> GetOrders()
    {
        var connection = new SqlConnection(_connectionString);
        connection.Open();

        var query =
            "SELECT Products.Name, Products.Price, Orders.Quantity, Orders.OrderDate, Orders.Status FROM Products INNER JOIN Orders ON Products.Id = Orders.ProductID";

        var result = connection.Query<GetOrdersDto>(query);
        return (List<GetOrdersDto>)result;
    }
}