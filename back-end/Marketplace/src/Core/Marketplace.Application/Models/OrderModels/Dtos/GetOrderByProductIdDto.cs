namespace Marketplace.Application.Models.OrderModels.Dtos;

public class GetOrderByProductIdDto
{
    public int Id { get; set; }

    public string Status { get; set; }
    
    public decimal Price { get; set; }

    public string Code { get; set; }

    public string Name { get; set; }
    
    public int Quantity { get; set; }

    public DateTime OrderDate { get; set; }
    
    public int UserId { get; set; }
}