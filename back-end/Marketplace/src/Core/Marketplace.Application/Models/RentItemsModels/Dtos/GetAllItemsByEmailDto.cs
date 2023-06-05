namespace Marketplace.Application.Models.RentItemsModels.Dtos;

public class GetAllItemsByEmailDto
{
    public string Email { get; set; }
    
    public List<RentItemsDto> Items{ get; set; }

}