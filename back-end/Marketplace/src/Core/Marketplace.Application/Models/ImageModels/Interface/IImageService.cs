using Markerplace.Domain.Entities;
using Marketplace.Application.Models.ImageModels.Dtos;

namespace Marketplace.Application.Models.ImageModels.Interface;

public interface IImageService
{
    Task DeleteImages(int productId);

   Task UploadImage(int productId, AddImageDto image);

   Task EditImage(int productId, AddImageDto image);
}