using Marketplace.Application.Models.ImageModels.Dtos;
using Marketplace.Application.Models.ImageModels.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Controllers;

[Authorize]
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
    public  async Task<ImageDto> UploadImage(int productId, [FromForm] AddImageDto image)
    {
      return await _imageService.UploadImage(productId, image);
    }

    [HttpPost("Edit/{productId}")]
    public async Task<ImageDto>  EditImage(int productId, [FromForm] AddImageDto image )
    {
       return await _imageService.EditImage( productId,  image);
    }
    
    [HttpDelete("Delete/{productId}")]
    public async Task  DeleteImages(int productId)
    {
       await _imageService.DeleteImages(productId);
    }
    
}