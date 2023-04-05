using Marketplace.Application.Models.ProductModels.Dtos;
using Marketplace.Application.Models.ProductModels.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Controllers;

[Route("api/Products")]
[ApiController]
public class ProductController : ControllerBase
{
   private readonly IProductService productService;

   public ProductController(IProductService productService)
   {
       this.productService = productService;
   }
   
   [HttpGet]
   public List<GetProductsDto> GetAll()
   {
      return productService.GetAll();
   }
}