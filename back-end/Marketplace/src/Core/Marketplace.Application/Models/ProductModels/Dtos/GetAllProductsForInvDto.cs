namespace Marketplace.Application.Models.ProductModels.Dtos;

public class GetAllProductsForInvDto
{
    public string Code { get; set; }

    public string Name { get; set; }
    
    public int QuantityForSale { get; set; }

    public int Quantity { get; set; }

    public string CategoryName { get; set; }
}