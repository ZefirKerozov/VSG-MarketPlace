using Markerplace.Domain.Entities;
using Marketplace.Application.Models.OrderModels.Dtos;
using AutoMapper;

namespace Marketplace.Application.Helpers.Profiles;

public class OrderProfile :Profile
{
    public OrderProfile()
    {
    CreateMap<CreateOrderDto, Orders>();
    }

}