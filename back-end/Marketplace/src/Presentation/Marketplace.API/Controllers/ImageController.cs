using Marketplace.Application.Models.ImageModels.Dtos;
using Marketplace.Application.Models.ImageModels.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Controllers;

[Route("api/Images")]
[ApiController]
public class ImageController : ControllerBase
{
    private readonly IImageService _imageService;

    public ImageController(IImageService imageService)
    {
        _imageService = imageService;
    }
    [HttpPost("Upload/{productId}")]
    public  async Task UploadImage(int productId, [FromForm] AddImageDto image)
    {
       await _imageService.UploadImage(productId, image);
    }

    [HttpDelete("Delete/{productId}")]
    public async Task  DeleteImages(int productId)
    {
       await _imageService.DeleteImages(productId);
    }
}