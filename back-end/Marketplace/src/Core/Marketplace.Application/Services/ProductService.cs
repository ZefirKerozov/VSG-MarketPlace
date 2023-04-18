using AutoMapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.ImageModels.Interface;
using Marketplace.Application.Models.ProductModels.Dtos;
using Marketplace.Application.Models.ProductModels.Interface;

namespace Marketplace.Application.Services;

public class ProductService :IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;

    public ProductService(IProductRepository productRepository, IMapper mapper, IImageService imageService)
    {
        _productRepository = productRepository;
        _mapper = mapper;
        _imageService = imageService;
        _imageService = imageService;
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

    public int AddProduct(AddProductDto productDto)
    { 
        return  _productRepository.Create( _mapper.Map<Products>(productDto));
    }

    public void DeleteProduct(int id)
    {
        _imageService.DeleteImages(id);
        _productRepository.Delete(id);
    }

    public void EditProducts(int id, ProductEditDto product)
    {
        var productForEdit = _mapper.Map<Products>(product);
        productForEdit.Id = id;
        _productRepository.Update(productForEdit);
    }
}