using Markerplace.Domain.Entities;
using Marketplace.Application.Models.ImageModels.Dtos;

namespace Marketplace.Application.Models.ImageModels.Interface;

public interface IImageService
{
    void DeleteImages(int id);

   void UploadImage(int productId, AddImageDto image);
}