using Marketplace.Application.Models.InventoryModels.DTOs;

namespace Marketplace.Application.Models.InventoryModels.Interface;

public interface IInvertoryService
{
    public List<GetAllProductsForInvDto> GetProducts();
}