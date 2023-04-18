using Marketplace.Application.Models.OrderModels.Dtos;

namespace Marketplace.Application.Models.OrderModels.Interfaces;

public interface IOrderService
{
    List<GetOrdersDto> GetPendingsOrders();
    void ChangeStatus(int id);

}