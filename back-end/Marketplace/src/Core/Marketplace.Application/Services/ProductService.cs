using System.Diagnostics.CodeAnalysis;
using System.Net;
using AutoMapper;
using Markerplace.Domain.Entities;
using Markerplace.Domain.Enums;
using Marketplace.Application.Helpers.Constants;
using Marketplace.Application.Models.ExceptionModel;
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
    private readonly IImageRepository _imageRepository;

    public ProductService(IProductRepository productRepository, IMapper mapper, IImageService imageService,
        IOrderService orderService, IImageRepository imageRepository)
    {
        _productRepository = productRepository;
        _mapper = mapper;
        _imageService = imageService;
        _orderService = orderService;
        _imageRepository = imageRepository;
        _imageService = imageService;
    }

    public async Task<List<GetProductsDto>> GetAllProductForSale()
    {
        var result = await _productRepository.GetAllProductForSale();

        foreach (var product in result)
        {
            if (product.img != null)
            {
                product.img = CreateURL(product.img);
            }
        }

        return result;
    }


    public async Task<ProductDetailsDto> GetById(int productId)
    {
        var entity = await _productRepository.GetById(productId);

        if (entity == null)
        {
            throw new HttpException($"Product Id not found!", HttpStatusCode.NotFound);
        }

        var result = _productRepository.GetProductById(productId);
        return await result;
    }


    public async Task<int> AddProduct(AddProductDto productDto)
    {
        var product = await _productRepository.GetProductCode(productDto.Code);
        if (product == null)
        {
            var productId = await _productRepository.Create(_mapper.Map<Product>(productDto));
            return productId;
        }
            throw new HttpException("Code exist!", HttpStatusCode.BadRequest);
        
    }


    public async Task DeleteProduct(int id)
    {
        var entity = await _productRepository.GetById(id);

        if (entity == null)
        {
            throw new HttpException($"Product Id not found!", HttpStatusCode.NotFound);
        }

        var order = await _orderService.GetPendingOrderByProductId(id);
        if (order != null)
        {
            throw new HttpException("Product can't be delete, because order is not complete!",
                HttpStatusCode.BadRequest);
        }


        await _imageService.DeleteImages(id);
        await _productRepository.Delete(id);
    }

    public async Task<ProductEditDto> EditProducts(int id, ProductEditDto product)
    {
        var entity = await _productRepository.GetById(id);
        if (entity == null)
        {
            throw new HttpException($"Product Id not found!", HttpStatusCode.NotFound);
        }

        var p = await _productRepository.GetProductCode(product.Code);
        if (p != null && p.Id != id)
        {
            throw new HttpException("Code exist!", HttpStatusCode.BadRequest);
        }

        var productForEdit = _mapper.Map<Product>(product);
        productForEdit.Id = id;
        await _productRepository.Update(productForEdit);
        return product;
    }

    private static string CreateURL(string url)
    {
        return CloudinaryConstants.baseUrl + url;
    }
}