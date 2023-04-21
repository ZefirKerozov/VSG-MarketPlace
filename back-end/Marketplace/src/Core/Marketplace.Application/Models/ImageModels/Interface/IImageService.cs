using Markerplace.Domain.Entities;
using Marketplace.Application.Models.ImageModels.Dtos;

namespace Marketplace.Application.Models.ImageModels.Interface;

public interface IImageService
{
    Task DeleteImages(int id);

   Task UploadImage(int productId, AddImageDto image);
}