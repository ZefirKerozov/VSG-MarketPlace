using AutoMapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.LocationModels.Dtos;

namespace Marketplace.Application.Helpers.Profiles;

public class LocationModel:Profile
{
    public LocationModel()
    {
        CreateMap<Location, GetLocationsDto>();
    }
}