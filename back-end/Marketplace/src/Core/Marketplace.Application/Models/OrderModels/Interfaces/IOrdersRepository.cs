using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.OrderModels.Dtos;

namespace Marketplace.Application.Models.OrderModels.Interfaces;

public interface IOrdersRepository :IGenericRepository<Orders>
{
     Task<List<GetOrdersDto>> GetPendingsOrders();
     
     Task<List<GetOrdersDto>> GetMyOrders(int userId);
}