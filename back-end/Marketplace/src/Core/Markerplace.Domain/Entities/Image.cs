namespace Markerplace.Domain.Entities;

public class Image : BaseEntity
{
    public string img { get; set; }
    
    public int ProductId { get; set; }
} 