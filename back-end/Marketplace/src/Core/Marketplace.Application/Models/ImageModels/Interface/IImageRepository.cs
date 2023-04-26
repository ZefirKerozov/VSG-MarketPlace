using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.ImageModels.Dtos;

namespace Marketplace.Application.Models.ImageModels.Interface;

public interface IImageRepository :IGenericRepository<Image>
{
    
    Task<GetImageDto> GetImageByProductId(int productId);
}