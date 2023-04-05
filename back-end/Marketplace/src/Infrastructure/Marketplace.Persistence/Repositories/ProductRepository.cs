using System.Data.SqlClient;
using Dapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.ProductModels.Dtos;
using Marketplace.Application.Models.ProductModels.Interface;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Persistence.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly string connectionString;
    
    public ProductRepository(IConfiguration config)
    {
        this.connectionString = config.GetConnectionString("SqlConnection");
    }

    public List<GetProductsDto> GetAllProduct()
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            connection.Open();

            string query =
                @"SELECT  Products.Price,   Products.QuantityForSale,  Categories.name AS CategoryName,  Images.img FROM Products  JOIN Categories ON Products.CategoryId = Categories.Id JOIN Images ON Products.ImageId = Images.Id;";
            var result = connection.Query<GetProductsDto>(query);
            return (List<GetProductsDto>)(result);
        }
    }

    public void DeleteWithProductId(int ProductId)
    {
    }
}