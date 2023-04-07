using Marketplace.Application.Models.OrderModels.Dtos;
using Marketplace.Application.Models.OrderModels.Interfaces;

namespace Marketplace.Application.Services;

public class OrdersService : IOrderService
{
    private readonly IOrdersRepository _ordersRepository;

    public OrdersService(IOrdersRepository ordersRepository)
    {
        _ordersRepository = ordersRepository;
    }
    public List<GetOrdersDto> GetAllOrders()
    {
       var result = _ordersRepository.GetOrders();
       return result;
    }
}