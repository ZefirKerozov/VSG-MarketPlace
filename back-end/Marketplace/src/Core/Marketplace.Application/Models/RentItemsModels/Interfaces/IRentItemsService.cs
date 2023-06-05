using Marketplace.Application.Models.RentItemsModels.Dtos;

namespace Marketplace.Application.Models.RentItemsModels.Interfaces;

public interface IRentItemsService
{
    public Task<int> CreateRent(AddItemForRentDto itemForRentDto);

    public Task<int> ReturnItem(int id);

    public Task<List<GetAllItemsByEmailDto>> GetAllItemsForRent();
}