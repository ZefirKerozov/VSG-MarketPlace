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
    public List<GetProductsDto> GetAllProduct()
    {
        

        string query =
            "SELECT  Products.Price,   Products.QuantityForSale,  Categories.name AS CategoryName,  Images.img FROM Products  JOIN Categories ON Products.CategoryId = Categories.Id JOIN Images ON Products.ImageId = Images.Id Where Products.QuantityForSale > 0; ";
        var result = Connection.Query<GetProductsDto>(query);
        return (List<GetProductsDto>)(result);
    }

    public ProductDetailsDto GetProductById(int productId)
    {
        string query = $"SELECT p.Name, p.Price, p.QuantityForSale, p.Description, c.Name as CategoryName  FROM Products p INNER JOIN Categories c ON p.CategoryId = c.Id WHERE p.Id = {productId}";
        var result = Connection.QueryFirst<ProductDetailsDto>(query);
        return (result);
    }
    
    public List<GetAllProductsForInvDto> GetProductsForInventory()
    {

        string query = "SELECT p.Code, p.Name, p.QuantityForSale, p.Quantity, c.Name AS CategoryName FROM Products p INNER JOIN Categories c ON p.CategoryID = c.Id;";
        var result = Connection.Query<GetAllProductsForInvDto>(query);
        return  (List<GetAllProductsForInvDto>)(result);
    }
    
    }