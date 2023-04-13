using Marketplace.Application.Models.OrderModels.Dtos;

namespace Marketplace.Application.Models.OrderModels.Interfaces;

public interface IOrderService
{
    List<GetOrdersDto> GetAllOrders();
    void ChangeStatus(int id);

}