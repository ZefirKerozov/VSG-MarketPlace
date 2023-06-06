namespace Marketplace.Application.Models.RentItemsModels.Dtos;

public class GetMyItems
{
    public int Quantity { get; set; }

    public string OrderDate { get; set; }

    public string? EndDate { get; set; }

    public string Code { get; set; }

    public string Name { get; set; }
}