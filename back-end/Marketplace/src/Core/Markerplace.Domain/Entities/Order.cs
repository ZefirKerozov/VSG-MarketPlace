using Markerplace.Domain.Enums;

namespace Markerplace.Domain.Entities;

public class Orders : BaseEntity
{
    public int Quantity { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public DateTime OrderDate { get; set; } = DateTime.Now;

    public int ProductId { get; set; }

    public int UserId { get; set; }

    public decimal Price { get; set; }

    public string Code { get; set; }
}