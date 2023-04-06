using Marketplace.Application.Models.ProductModels.Dtos;

namespace Marketplace.Application.Models.ProductModels.Interface;

public interface IProductService
{
    public List<GetProductsDto> GetAll();

    ProductDetailsDto GetById(int productId);
}