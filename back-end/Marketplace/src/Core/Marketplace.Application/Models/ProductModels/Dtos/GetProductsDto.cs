namespace Marketplace.Application.Models.ProductModels.Dtos;

public class GetProductsDto
{
    public int Id { get; set; }
    
    public decimal Price { get; set; }
    
    public int QuantityForSale { get; set; }

    public string CategoryName { get; set; }
    
    public int CategoryId { get; set; }
    public string img { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Code { get; set; }

    public int Quantity { get; set; }
    
    public string LocationName { get; set; }

    public int LocationId { get; set; }

}