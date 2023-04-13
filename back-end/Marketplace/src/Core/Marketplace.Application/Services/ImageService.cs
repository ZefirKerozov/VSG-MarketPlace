using Marketplace.Application.Models.ImageModels.Interface;

namespace Marketplace.Application.Services;

public class ImageService :IImageService
{
    private readonly IImageRepository _imageRepository;

    public ImageService(IImageRepository imageRepository)
    {
        _imageRepository = imageRepository;
    }
    public void DeleteImages(int id)
    {
        _imageRepository.Delete(id);
    }
}