using Marketplace.Application.Models.InventoryModels.DTOs;
using Marketplace.Application.Models.InventoryModels.Interface;

namespace Marketplace.Application.Services;

public class InvertoryService :IInvertoryService
{
    private readonly IInvertoryRepository _invertoryRepository;

    public InvertoryService(IInvertoryRepository invertoryRepository)
    {
        _invertoryRepository = invertoryRepository;
    }
    public List<GetAllProductsForInvDto> GetProducts()
    {
       return _invertoryRepository.GetProducts();
    }
}