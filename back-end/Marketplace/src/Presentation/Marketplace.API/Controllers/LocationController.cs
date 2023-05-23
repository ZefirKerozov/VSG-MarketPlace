using Marketplace.Application.Models.LocationModels.Dtos;
using Marketplace.Application.Models.LocationModels.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Controllers;

[Authorize]
[Route("api/Location")]
[ApiController]
public  class LocationController :ControllerBase
{
    private readonly ILocationService _locationService;

    public LocationController(ILocationService locationService)
    {
        _locationService = locationService;
    }
    
    [HttpGet]
    [Route("All")]
    public async Task<List<GetLocationsDto>> GetLocations()
    {
      return await _locationService.GetLocations();
    }
}