using Markerplace.Domain.Entities;
using Marketplace.Application.Models.ProductModels.Dtos;

namespace Marketplace.Application.Models.ProductModels.Interface;

public interface IProductService
{
    public Task<List<GetProductsDto>> GetAllProductForSale();

    Task<ProductDetailsDto> GetById(int productId);


    public Task<AddProductDto> AddProduct(AddProductDto productDto);

    Task DeleteProduct(int id);
    
    Task EditProducts(int id, ProductEditDto product);
}