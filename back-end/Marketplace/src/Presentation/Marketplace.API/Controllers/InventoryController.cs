using Marketplace.Application.Models.InventoryModels.DTOs;
using Marketplace.Application.Models.InventoryModels.Interface;
using Marketplace.Application.Models.ProductModels.Dtos;
using Marketplace.Application.Models.ProductModels.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Controllers;

[Route("api/Inventory")]
[ApiController]
public class InventoryController :ControllerBase
{
    private readonly IInvertoryService _invertoryService;

    public InventoryController(IInvertoryService invertoryService)
    {
        _invertoryService = invertoryService;
    }
    [HttpGet]
    public List<GetAllProductsForInvDto>   GetAllProducts()
    {
       var  result = _invertoryService.GetProducts();
        return (List<GetAllProductsForInvDto>)result;
}
}