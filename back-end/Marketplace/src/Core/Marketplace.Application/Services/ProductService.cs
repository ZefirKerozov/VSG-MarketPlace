using AutoMapper;
using Markerplace.Domain.Entities;
using Markerplace.Domain.Enums;
using Marketplace.Application.Helpers.Constants;
using Marketplace.Application.Models.ImageModels.Interface;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Marketplace.Application.Models.ProductModels.Dtos;
using Marketplace.Application.Models.ProductModels.Interface;

namespace Marketplace.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;
    private readonly IOrderService _orderService;

    public ProductService(IProductRepository productRepository, IMapper mapper, IImageService imageService, IOrderService orderService)
    {
        _productRepository = productRepository;
        _mapper = mapper;
        _imageService = imageService;
        _orderService = orderService;
        _imageService = imageService;
    }

    public async Task<List<GetProductsDto>> GetAllProductForSale()
    {
        var result = await _productRepository.GetAllProductForSale();

        foreach (var product in result)
        {
            if (product.img != null)
            {
                product.img = CloudinaryConstants.baseUrl + product.img;
            }
        }

        return result;
    }

    public async Task<ProductDetailsDto> GetById(int productId)
    {
        await ExceptionService.ThrowExceptionWhenIdNotFound(productId, _productRepository);
        var result = _productRepository.GetProductById(productId);
        return await result;
    }


    public async Task<int> AddProduct(AddProductDto productDto)
    {
        
       var productId = await _productRepository.Create(_mapper.Map<Product>(productDto));
        return productId;
    }

    public async Task DeleteProduct(int id)
    {
        await ExceptionService.ThrowExceptionWhenIdNotFound(id, _productRepository);

        var statusCode = await _orderService.GetStatusCodeByProductId(id);
        if (statusCode != "Without product")
        {
            ExceptionService.ThrowExceptionWhenOrderIsNotComplete(statusCode);
        }
      
         
        await _imageService.DeleteImages(id);
        await _productRepository.Delete(id);
    }

    public async Task EditProducts(int id, ProductEditDto product)
    {
        await ExceptionService.ThrowExceptionWhenIdNotFound(id, _productRepository);
        var productForEdit = _mapper.Map<Product>(product);
        productForEdit.Id = id;
        await _productRepository.Update(productForEdit);
    }
}