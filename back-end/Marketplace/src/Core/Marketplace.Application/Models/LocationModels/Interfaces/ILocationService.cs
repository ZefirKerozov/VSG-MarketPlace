using Markerplace.Domain.Entities;
using Marketplace.Application.Models.LocationModels.Dtos;
using Marketplace.Application.Models.ProductModels.Dtos;

namespace Marketplace.Application.Models.LocationModels.Interfaces;

public interface ILocationService
{
    public  Task<List<GetLocationsDto>> GetLocations();
}