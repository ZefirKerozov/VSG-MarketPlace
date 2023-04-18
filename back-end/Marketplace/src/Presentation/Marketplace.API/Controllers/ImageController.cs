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
    public  void UploadImage(int productId, [FromForm] AddImageDto image)
    {
        _imageService.UploadImage(productId, image);
    }

    [HttpDelete("Delete/{imageId}")]
    public void DeleteImages(int imageId)
    {
        _imageService.DeleteImages(imageId);
    }
}