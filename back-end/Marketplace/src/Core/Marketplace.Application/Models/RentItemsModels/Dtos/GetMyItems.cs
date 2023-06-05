namespace Marketplace.Application.Models.RentItemsModels.Dtos;

public class GetMyItems
{
    public int Quantity { get; set; }

    public DateTime OrderDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string Code { get; set; }

    public string Name { get; set; }
}