using Markerplace.Domain.Enums;

namespace Markerplace.Domain.Entities;

public class Orders :BaseEntity
{
    public int Quantity { get; set; }

    public OrderStatus Status { get; set; }

    public DateTime OrderDate { get; set; }

    public int ProductId { get; set; }

    public int UserId { get; set; }
}