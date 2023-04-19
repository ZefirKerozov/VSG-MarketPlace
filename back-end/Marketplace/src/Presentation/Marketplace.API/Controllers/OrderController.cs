using Markerplace.Domain.Enums;
using Marketplace.Application.Models.OrderModels.Dtos;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Transport.Quic;

namespace Marketplace.API.Controllers;

[Route("api/Orders")]
[ApiController]
public class OrderController :ControllerBase
{
    private readonly IOrderService _orderService;

   
    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    [Route("Pending")]
    public List<GetOrdersDto> GetPendingOrders()
    {
        return _orderService.GetPendingsOrders();
    }
    [HttpPut]
    [Route("Orders/Status/{id}")]
    public void ChangeStatus(int id)
    {
        _orderService.ChangeStatus(id);
    }
    [HttpGet]
    [Route("MyOrders/{userId}")]
    public List<GetOrdersDto> GetMyOrders(int userId)
    {
        return _orderService.GetMyOrders(userId);
    }

    [HttpPost]
    [Route("Add")]
    
    public void CreateOrder(CreateOrderDto dto)
    {
        _orderService.CreateOrder(dto);
    }
}