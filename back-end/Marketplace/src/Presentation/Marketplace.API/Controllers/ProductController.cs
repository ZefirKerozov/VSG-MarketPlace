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
       this._productService = productService;
   }
   
   [HttpGet]
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
   [Route("Invertory")]

   public List<GetAllProductsForInvDto> GetAllProductsForInv()
   {
       var result = _productService.GetProductsForInventory();
       return (List<GetAllProductsForInvDto>)result;
   }
}