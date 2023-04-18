using Marketplace.Application.Models.OrderModels.Dtos;

namespace Marketplace.Application.Models.OrderModels.Interfaces;

public interface IOrderService
{
    List<GetOrdersDto> GetPendingsOrders();
    List<GetOrdersDto> GetMyOrders(int userId);

    void ChangeStatus(int id);

}