namespace Markerplace.Domain.Entities;

public class Products :BaseEntity
{
    public string Name { get; set; }

    public int Quantity { get; set; }

    public string Description { get; set; }
    
    public string Code { get; set; }

    public int QuantityForSale { get; set; }

    public int ImageId { get; set; }

    public int CategoryId { get; set; }
    
    public int LocationId { get; set; }

    public decimal Price { get; set; }
}