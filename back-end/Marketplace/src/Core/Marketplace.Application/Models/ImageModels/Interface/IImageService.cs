using Markerplace.Domain.Entities;

namespace Marketplace.Application.Models.ImageModels.Interface;

public interface IImageService
{
    void DeleteImages(int id);
}