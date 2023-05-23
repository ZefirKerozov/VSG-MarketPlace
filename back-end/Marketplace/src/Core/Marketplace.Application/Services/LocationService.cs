using AutoMapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.LocationModels.Dtos;
using Marketplace.Application.Models.LocationModels.Interfaces;

namespace Marketplace.Application.Services;

public class LocationService:ILocationService
{
    private readonly ILocationRepository _locationRepository;
    private readonly IMapper _mapper;

    public LocationService(ILocationRepository locationRepository, IMapper mapper)
    {
        _locationRepository = locationRepository;
        _mapper = mapper;
    }
    public async Task<List<GetLocationsDto>> GetLocations()
    {
        
        return _mapper.Map<List<GetLocationsDto>>(await _locationRepository.GetAll());
    }
}