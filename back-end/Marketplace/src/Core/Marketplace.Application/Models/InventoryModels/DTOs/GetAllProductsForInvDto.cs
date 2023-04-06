namespace Marketplace.Application.Models.InventoryModels.DTOs;

public class GetAllProductsForInvDto
{
    public string Code { get; set; }

    public string Name { get; set; }
    
    public int QuantityForSale { get; set; }

    public int Quantity { get; set; }

    public string CategoryName { get; set; }
}