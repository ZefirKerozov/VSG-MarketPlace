namespace Markerplace.Domain.Entities;

public class RentItems :BaseEntity
{
    public int Quantity { get; set; }
    
    public DateTime OrderDate { get; set; } = DateTime.Now;

    public DateTime EndDate { get; set; } = DateTime.Now;

    public int ProductId { get; set; }

    public string Email { get; set; }
    
    public string Code { get; set; }

    public string Name { get; set; }
}