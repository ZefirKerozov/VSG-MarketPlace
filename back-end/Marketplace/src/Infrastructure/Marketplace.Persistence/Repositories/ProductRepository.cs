using System.Data.SqlClient;
using Dapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.ProductModels.Dtos;
using Marketplace.Application.Models.ProductModels.Interface;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Persistence.Repositories;

public class ProductRepository : GenericRepository<Product>, IProductRepository
{
    public ProductRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
    }

    public async  Task<List<GetProductsDto>> GetAllProductForSale()
    {


        string query =
            "SELECT Products.Quantity,Products.Code, Products.Name, Products.Description, Products.Id,  Products.Price,   Products.QuantityForSale,  Categories.Name AS CategoryName,  Images.img FROM Products  JOIN Categories ON Products.CategoryId = Categories.Id LEFT JOIN Images ON Products.Id = Images.ProductId ";
        var result = await Connection.QueryAsync<GetProductsDto>(query, null, Transaction);
        return (List<GetProductsDto>)(result);
    }

    public async Task<ProductDetailsDto> GetProductById(int productId)
    {
        string query =
            @"SELECT p.Id, p.Name, p.Price, p.QuantityForSale, p.Description, c.Name as CategoryName, Images.img  FROM Products p INNER JOIN Categories c ON p.CategoryId = c.Id JOIN Images ON p.Id = Images.ProductId WHERE p.Id = @productId";
        var result = await Connection.QueryFirstAsync<ProductDetailsDto>(query, new{productId}, Transaction);
        return  (result);
    }

  
}
