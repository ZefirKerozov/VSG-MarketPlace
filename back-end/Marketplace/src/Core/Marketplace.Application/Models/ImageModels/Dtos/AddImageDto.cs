using Microsoft.AspNetCore.Http;

namespace Marketplace.Application.Models.ImageModels.Dtos;

public class AddImageDto
{
    public IFormFile Image { get; set; }
}