using System.Data.SqlClient;
using Dapper;
using Marketplace.Application.Models.ProductModels.Dtos;
using Marketplace.Application.Models.ProductModels.Interface;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Persistence.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly string? _connectionString;

    public ProductRepository(IConfiguration config)
    {
        this._connectionString = config.GetConnectionString("SqlConnection");
    }

    public List<GetProductsDto> GetAllProduct()
    {
        using var connection = new SqlConnection(this._connectionString);
        connection.Open();

        string query =
            "SELECT  Products.Price,   Products.QuantityForSale,  Categories.name AS CategoryName,  Images.img FROM Products  JOIN Categories ON Products.CategoryId = Categories.Id JOIN Images ON Products.ImageId = Images.Id Where Products.QuantityForSale > 0; ";
        var result = connection.Query<GetProductsDto>(query);
        return (List<GetProductsDto>)(result);
    }

    public ProductDetailsDto GetProductById(int productId)
    {
        using var connection = new SqlConnection(this._connectionString);
        connection.Open();

        string query = $"SELECT p.Name, p.Price, p.QuantityForSale, p.Description, c.Name as CategoryName  FROM Products p INNER JOIN Categories c ON p.CategoryId = c.Id WHERE p.Id = {productId}";
        var result = connection.QueryFirst<ProductDetailsDto>(query);
        return (result);
    }
    }