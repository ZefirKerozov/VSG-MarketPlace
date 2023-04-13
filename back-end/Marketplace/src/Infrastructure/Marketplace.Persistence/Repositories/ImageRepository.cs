using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.ImageModels.Interface;

namespace Marketplace.Persistence.Repositories;

public class ImageRepository :GenericRepository<Images>, IImageRepository
{
    public ImageRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
    }
}