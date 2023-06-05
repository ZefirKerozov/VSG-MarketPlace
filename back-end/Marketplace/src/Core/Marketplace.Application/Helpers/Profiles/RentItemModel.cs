using AutoMapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.RentItemsModels.Dtos;

namespace Marketplace.Application.Helpers.Profiles;

public class RentItemModel:Profile
{
    public RentItemModel()
    {
        CreateMap<AddItemForRentDto, RentItems>();
        CreateMap<RentItems, RentItemsDto>();
    }   
}