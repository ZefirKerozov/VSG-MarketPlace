using System.Runtime.InteropServices.JavaScript;

namespace Markerplace.Domain.Entities;

public class RentItems :BaseEntity
{
    public int Quantity { get; set; }

    public string OrderDate { get; set; } = DateTime.Now.ToString("yyyy/dd/mm hh:mm");

    public string? EndDate { get; set; } 
    

    public int ProductId { get; set; }

    public string Email { get; set; }
    
    public string Code { get; set; }

    public string Name { get; set; }
}