using AutoMapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.ProductModels.Dtos;
using Marketplace.Application.Models.ProductModels.Interface;

namespace Marketplace.Application.Services;

public class ProductService :IProductService
{
    private readonly IProductRepository _productRepository;

    private readonly IMapper _mapper;

    public ProductService(IProductRepository productRepository, IMapper mapper)
    {
        _productRepository = productRepository;
        _mapper = mapper;
    }
    public List<GetProductsDto> GetAll()
    {
        var result = _productRepository.GetAllProduct();
        return result;
    }

    public ProductDetailsDto GetById(int productId)
    {
        var result = _productRepository.GetProductById(productId);
        return result;
    }

    public List<GetAllProductsForInvDto> GetProductsForInventory()
    {
        return _productRepository.GetProductsForInventory();

    }

    public void AddProduct(AddProductDto productDto)
    { 
        _productRepository.Create( _mapper.Map<Products>(productDto));
    }
}