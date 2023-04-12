using Marketplace.Application.Models.ProductModels.Dtos;
using Marketplace.Application.Models.ProductModels.Interface;

namespace Marketplace.Application.Services;

public class ProductService :IProductService
{
    private readonly IProductRepository productRepository;

    public ProductService(IProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }
    public List<GetProductsDto> GetAll()
    {
        var result = productRepository.GetAllProduct();
        return result;
    }

    public ProductDetailsDto GetById(int productId)
    {
        var result = productRepository.GetProductById(productId);
        return result;
    }

    public List<GetAllProductsForInvDto> GetProductsForInventory()
    {
        return productRepository.GetProductsForInventory();

    }
}