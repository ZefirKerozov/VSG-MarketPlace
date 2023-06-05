namespace Marketplace.Application.Models.RentItemsModels.Dtos;

public class RentItemsDto
{
    public int Quantity { get; set; }
    
    public DateTime OrderDate { get; set; } = DateTime.Now;

    public DateTime EndDate { get; set; } = DateTime.Now;
    
    public string Code { get; set; }

    public string Name { get; set; }
}