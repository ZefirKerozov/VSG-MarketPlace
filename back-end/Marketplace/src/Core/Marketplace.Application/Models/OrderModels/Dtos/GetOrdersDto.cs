using Markerplace.Domain.Enums;

namespace Marketplace.Application.Models.OrderModels.Dtos;

public class GetOrdersDto
{
    public int Id { get; set; }
    
    public string Code { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public string OrderDate { get; set; }

    public string Status { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }

}