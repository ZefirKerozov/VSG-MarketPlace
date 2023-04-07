using Marketplace.Application.Models.OrderModels.Dtos;

namespace Marketplace.Application.Models.OrderModels.Interfaces;

public interface IOrdersRepository
{
     List<GetOrdersDto> GetOrders();
}