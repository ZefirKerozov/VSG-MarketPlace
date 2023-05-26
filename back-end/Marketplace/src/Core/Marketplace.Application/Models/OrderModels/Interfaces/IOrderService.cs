using Marketplace.Application.Models.OrderModels.Dtos;

namespace Marketplace.Application.Models.OrderModels.Interfaces;

public interface IOrderService
{
   Task<List<GetOrdersDto>> GetPendingsOrders();
   Task<List<GetOrdersDto>> GetMyOrders(string email);

    Task ChangeStatus(int id);

    Task CreateOrder(CreateOrderDto dto, string email);
    Task RejectOrder(int id);

    Task<GetOrderByProductIdDto> GetPendingOrderByProductId(int productId);
}