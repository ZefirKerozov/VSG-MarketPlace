using Markerplace.Domain.Enums;
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

    public void ChangeStatus(int id)
    {
        var order = _ordersRepository.GetById(id);
        order.Status = OrderStatus.Finished;
        _ordersRepository.Update(order);
    }
}