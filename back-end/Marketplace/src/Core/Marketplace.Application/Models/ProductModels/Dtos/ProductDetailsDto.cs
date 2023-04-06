namespace Marketplace.Application.Models.ProductModels.Dtos;

public class ProductDetailsDto
{
    public string  Name  { get; set; }

    public decimal Price { get; set; }

    public string Category { get; set; }

    public int QuantityForSale { get; set; }

    public string Description { get; set; }
}