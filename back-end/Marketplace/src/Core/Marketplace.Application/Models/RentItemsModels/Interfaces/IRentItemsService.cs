using Markerplace.Domain.Entities;
using Marketplace.Application.Models.RentItemsModels.Dtos;

namespace Marketplace.Application.Models.RentItemsModels.Interfaces;

public interface IRentItemsService
{
    public Task<int> CreateRent(AddItemForRentDto itemForRentDto);

    public Task<ReturnItemDto> ReturnItem(int id);

    public Task<List<GetAllItemsByEmailDto>> GetAllItemsForRent();

    public Task<List<GetMyItems>> GetMyItems(string email);

    public Task<RentItems> GetItemByProductId(int productId);
}