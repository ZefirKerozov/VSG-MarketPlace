using Marketplace.Application.Models.RentItemsModels.Dtos;
using Marketplace.Application.Models.RentItemsModels.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Controllers;

[Authorize]
[Route("api/Products")]
[ApiController]
public class RentItemController: ControllerBase
{
    private readonly IRentItemsService _rentItemsService;

    public RentItemController(IRentItemsService rentItemsService)
    {
        _rentItemsService = rentItemsService;
    }
    [HttpGet]
    [Route("AllItemForRent")]

    public async Task<List<GetAllItemsByEmailDto>> GetAllItems()
    {
        return await _rentItemsService.GetAllItemsForRent();
    }
    
    [HttpGet]
    [Route("MyItems/{email}")]

    public async Task<List<GetMyItems>> GetMyItems(string email)
    {
        return await _rentItemsService.GetMyItems(email);
    }
    
    [HttpPost]
    [Route("AddItem")]
    
    public async Task<int> CreateOrder(AddItemForRentDto dto)
    {
       return await  _rentItemsService.CreateRent(dto);
    }
    
    [HttpDelete]
    [Route("ReturnItem/{id}")]
    public async Task<int> ReturnItem(int id)
    {
        return await _rentItemsService.ReturnItem(id);
    }
}