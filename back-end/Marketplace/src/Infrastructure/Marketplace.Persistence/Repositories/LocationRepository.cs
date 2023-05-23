using Markerplace.Domain.Entities;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.LocationModels.Interfaces;

namespace Marketplace.Persistence.Repositories;

public class LocationRepository:GenericRepository<Location>, ILocationRepository
{
    public LocationRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
    }
}