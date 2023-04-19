using Markerplace.Domain.Enums;

namespace Marketplace.Application.Models.OrderModels.Dtos;

public class CreateOrderDto
{
    public int Quantity { get; set; }
    
    public int ProductId { get; set; }

    public int UserId { get; set; }
}