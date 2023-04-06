using Marketplace.Application.Models.InventoryModels.DTOs;

namespace Marketplace.Application.Models.InventoryModels.Interface;

public interface IInvertoryRepository
{
   public List<GetAllProductsForInvDto> GetProducts();
}