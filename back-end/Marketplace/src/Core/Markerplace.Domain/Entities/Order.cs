using Markerplace.Domain.Enums;

namespace Markerplace.Domain.Entities;

public class Order : BaseEntity
{
    public int Quantity { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public string OrderDate { get; set; }  = DateTime.Now.ToString("yyyy/dd/mm hh:mm");

    public int ProductId { get; set; }

    public string Email { get; set; }

    public decimal Price { get; set; }

    public string Code { get; set; }

    public string Name { get; set; }
}