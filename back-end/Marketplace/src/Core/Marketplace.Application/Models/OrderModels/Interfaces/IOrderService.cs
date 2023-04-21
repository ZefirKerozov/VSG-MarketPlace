using Marketplace.Application.Models.OrderModels.Dtos;

namespace Marketplace.Application.Models.OrderModels.Interfaces;

public interface IOrderService
{
   Task<List<GetOrdersDto>> GetPendingsOrders();
   Task<List<GetOrdersDto>> GetMyOrders(int userId);

    Task ChangeStatus(int id);

    Task CreateOrder(CreateOrderDto dto);
    Task RejectOrder(int id);
}