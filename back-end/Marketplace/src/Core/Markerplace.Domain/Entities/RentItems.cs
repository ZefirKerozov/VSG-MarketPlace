using System.Runtime.InteropServices.JavaScript;

namespace Markerplace.Domain.Entities;

public class RentItems :BaseEntity
{
    public int Quantity { get; set; }

    public DateTime OrderDate { get; set; } = DateTime.Parse(DateTime.Now.ToString("yyyy/dd/mm hh:mm"));

    public DateTime? EndDate { get; set; } 
    

    public int ProductId { get; set; }

    public string Email { get; set; }
    
    public string Code { get; set; }

    public string Name { get; set; }
}