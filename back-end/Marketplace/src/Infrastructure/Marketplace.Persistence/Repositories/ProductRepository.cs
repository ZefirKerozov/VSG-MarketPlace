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
            "SELECT Product.Quantity,Product.Code, Product.Name, Product.Description, Product.Id,  Product.Price,   Product.QuantityForSale,  Category.Name AS CategoryName, Category.Id AS CategoryId ,  Image.img FROM Product  JOIN Category ON Product.CategoryId = Category.Id LEFT JOIN Image ON Product.Id = Image.ProductId ";
        var result = await Connection.QueryAsync<GetProductsDto>(query, null, Transaction);
        return (List<GetProductsDto>)(result);
    }

    public async Task<ProductDetailsDto> GetProductById(int productId)
    {
        string query =
            @"SELECT p.Id, p.Name, p.Price, p.QuantityForSale, p.Description, c.Name as CategoryName, Images.img  FROM Product p INNER JOIN Category c ON p.CategoryId = c.Id JOIN Image ON p.Id = Image.ProductId WHERE p.Id = @productId";
        var result = await Connection.QueryFirstAsync<ProductDetailsDto>(query, new{productId}, Transaction);
        return  (result);
    }

  
}
