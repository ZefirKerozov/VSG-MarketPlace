using System.Data.SqlClient;
using System.Net;
using Dapper;
using Marketplace.Application.Models.InventoryModels.DTOs;
using Marketplace.Application.Models.InventoryModels.Interface;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Persistence.Repositories;

public class InvertoryRepository :IInvertoryRepository
{
    
    private readonly string? _connectionString;

    public InvertoryRepository(IConfiguration config)
    {
        this._connectionString = config.GetConnectionString("SqlConnection");
    }
    
    
    public List<GetAllProductsForInvDto> GetProducts()
    {
        using var connection = new SqlConnection(this._connectionString);
        connection.Open();

        string query = "SELECT p.Code, p.Name, p.QuantityForSale, p.Quantity, c.Name AS CategoryName FROM Products p INNER JOIN Categories c ON p.CategoryID = c.Id;";
        var result = connection.Query<GetAllProductsForInvDto>(query);
        return  (List<GetAllProductsForInvDto>)(result);
    }
}