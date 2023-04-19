using Markerplace.Domain.Enums;

namespace Marketplace.Application.Models.OrderModels.Dtos;

public class GetOrdersDto
{
    public string Name { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public DateTime OrderDate { get; set; }

    public string Status { get; set; }

}