using System.Data.SqlClient;
using Dapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.ProductModels.Dtos;
using Marketplace.Application.Models.ProductModels.Interface;
using Microsoft.Extensions.Configuration;

namespace Marketplace.Persistence.Repositories;

public class ProductRepository : GenericRepository<Products>, IProductRepository
{
    public ProductRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
    }

    public List<GetProductsDto> GetAllProductForSale()
    {


        string query =
            "SELECT Products.Name, Products.Description, Products.Id,  Products.Price,   Products.QuantityForSale,  Categories.name AS CategoryName,  Images.img FROM Products  JOIN Categories ON Products.CategoryId = Categories.Id JOIN Images ON Products.Id = Images.ProductId Where Products.QuantityForSale > 0; ";
        var result = Connection.Query<GetProductsDto>(query, null, Transaction);
        return (List<GetProductsDto>)(result);
    }

    public ProductDetailsDto GetProductById(int productId)
    {
        string query =
            @"SELECT p.Id, p.Name, p.Price, p.QuantityForSale, p.Description, c.Name as CategoryName, Images.img  FROM Products p INNER JOIN Categories c ON p.CategoryId = c.Id JOIN Images ON p.Id = Images.ProductId WHERE p.Id = @productId";
        var result = Connection.QueryFirst<ProductDetailsDto>(query, new{productId}, Transaction);
        return (result);
    }

    public List<GetAllProductsForInvDto> GetProductsForInventory()
    {

        string query =
            "SELECT p.Description,p.Id, p.Code, p.Name, p.QuantityForSale, p.Quantity, c.Name AS CategoryName FROM Products p INNER JOIN Categories c ON p.CategoryID = c.Id;";
        var result = Connection.Query<GetAllProductsForInvDto>(query,null, Transaction);
        return (List<GetAllProductsForInvDto>)(result);
    }
}
