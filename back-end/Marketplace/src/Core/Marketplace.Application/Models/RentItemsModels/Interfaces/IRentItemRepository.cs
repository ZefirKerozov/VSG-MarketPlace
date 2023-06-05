using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.RentItemsModels.Dtos;

namespace Marketplace.Application.Models.RentItemsModels.Interfaces;

public interface IRentItemRepository :IGenericRepository<RentItems>
{
  public Task<List<RentItems>> GetAllItemsForRentByEmail();

  public Task<List<GetMyItems>> GetMyItems(string email);
}