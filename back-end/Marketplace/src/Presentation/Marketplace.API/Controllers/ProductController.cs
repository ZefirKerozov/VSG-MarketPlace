using Markerplace.Domain.Entities;
using Marketplace.Application.Models.ProductModels.Dtos;
using Marketplace.Application.Models.ProductModels.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Controllers;

[Route("api/Products")]
[ApiController]
public class ProductController : ControllerBase
{
   private readonly IProductService _productService;

   public   ProductController(IProductService productService)
   {
       _productService = productService;
   }
   
   [HttpGet]
   [Route("All")]

   public async Task<List<GetProductsDto>> GetAllProducts()
   {
      return await _productService.GetAllProductForSale();
   }
   
   [HttpGet ("{productId}")]
   public async Task<ProductDetailsDto> ProductDetails(int productId)
   {
       return await _productService.GetById(productId);
   }


   [HttpPost]
   [Route("Inventory/Add")]
   public async Task<int> AddProduct(AddProductDto productDto)
   {
      return await _productService.AddProduct(productDto);
   }

   [HttpDelete]
   [Route("Inventory/Delete/{id}")]
   public async Task DeleteProduct(int id)
   {
      await _productService.DeleteProduct(id);
   }

   [HttpPut]
   [Route("Edit/{id}")]

   public async Task EditProducts(int id, ProductEditDto product)
   {
      await _productService.EditProducts(id, product);
   }
   
}