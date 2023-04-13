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

   public ProductController(IProductService productService)
   {
       _productService = productService;
   }
   
   [HttpGet]
   [Route("ForSale")]

   public List<GetProductsDto> GetAll()
   {
      return _productService.GetAll();
   }
   
   [HttpGet ("productId")]
   public ProductDetailsDto ProductDetails(int productId)
   {
       return _productService.GetById(productId);
   }

   [HttpGet ]

   public List<GetAllProductsForInvDto> GetAllProductsForInv()
   {
       var result = _productService.GetProductsForInventory();
       return (List<GetAllProductsForInvDto>)result;
   }

   [HttpPost]
   public void AddProduct(AddProductDto productDto)
   {
       _productService.AddProduct(productDto);
   }

   [HttpDelete("{id}")]
   public void DeleteProduct(int id)
   {
       _productService.DeleteProduct(id);
   }
}