namespace Marketplace.Application.Models.ProductModels.Dtos;

public class GetProductsDto
{
    public int Id { get; set; }
    
    public decimal Price { get; set; }
    
    public int QuantityForSale { get; set; }

    public string CategoryName { get; set; }
    
    public string CategoryId { get; set; }
    public string img { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Code { get; set; }

    public int Quantity { get; set; }
}