namespace Marketplace.Application.Models.ProductModels.Dtos;

public class GetProductsDto
{
    public decimal Price { get; set; }
    
    public int QuantityForSale { get; set; }

    public string CategoryName { get; set; }

    public string img { get; set; }
}