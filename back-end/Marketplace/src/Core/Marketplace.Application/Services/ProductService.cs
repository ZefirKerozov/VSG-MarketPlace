using AutoMapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Helpers.Constants;
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
    public async Task<List<GetProductsDto>> GetAllProductForSale()
    {
        var result = await _productRepository.GetAllProductForSale();
        foreach (var product in result)
        {
            product.img = CloudinaryConstants.baseUrl + product.img;
        }
        return  result;
    }

    public async Task<ProductDetailsDto> GetById(int productId)
    {
        var result = _productRepository.GetProductById(productId);
        return await result;
    }


    public async Task<int> AddProduct(AddProductDto productDto)
    { 
        return await _productRepository.Create( _mapper.Map<Products>(productDto));
    }

    public async Task DeleteProduct(int id)
    {
       await _imageService.DeleteImages(id);
      await  _productRepository.Delete(id);
    }

    public async Task EditProducts(int id, ProductEditDto product)
    {
       //await throw ExceptionService.ThrowExceptionWhenIdNotFound(id);
        var productForEdit = _mapper.Map<Products>(product);
        productForEdit.Id = id;
      await  _productRepository.Update(productForEdit);
    }
}