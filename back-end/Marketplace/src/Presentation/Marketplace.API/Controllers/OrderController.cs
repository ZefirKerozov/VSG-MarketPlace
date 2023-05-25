using System.Security.Claims;
using FluentValidation;
using Markerplace.Domain.Enums;
using Marketplace.API.Identity;
using Marketplace.Application.Models.OrderModels.Dtos;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Transport.Quic;

namespace Marketplace.API.Controllers;

[Authorize]
[Route("api/Orders")]
[ApiController]
public class OrderController :ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IValidator<CreateOrderDto> _createOrderValidator;


    public OrderController(IOrderService orderService, IValidator<CreateOrderDto> createOrderValidator)
    {
        _orderService = orderService;
        _createOrderValidator = createOrderValidator;
    }

    [HttpGet]
    [Authorize(Policy = IdentityData.Admin)]
    [Route("Pending")]
    public async Task<List<GetOrdersDto>> GetPendingOrders()
    {
        return await _orderService.GetPendingsOrders();
    }
    [HttpGet]
    [Route("My-Orders")]
    public async Task<List<GetOrdersDto>> GetMyOrders()
    {
        string email =  this.User.Claims.First(claim => claim.Type == "preferred_username").Value;

        return await _orderService.GetMyOrders(email);
    }

    [HttpPost]
    [Route("Add")]
    
    public async Task CreateOrder(CreateOrderDto dto)
    {
        await _createOrderValidator.ValidateAndThrowAsync(dto); 
      string email =  this.User.Claims.First(claim => claim.Type == "preferred_username").Value;
      await  _orderService.CreateOrder(dto, email);
    }

    [HttpPut]
    [Authorize(Policy = IdentityData.Admin)]
    [Route("Orders/Status/{id}")]
    public async Task ChangeStatus(int id)
    {
       await _orderService.ChangeStatus(id);
    }
    
    [HttpDelete]
    [Route("Reject/{id}")]
    public async Task RejectOrder(int id)
    {
       await _orderService.RejectOrder( id);
    }
}