using AutoMapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.ProductModels.Dtos;

namespace Marketplace.Application.Helpers.Profiles;

public class ProductProfile :Profile
{
    public ProductProfile()
    {
        CreateMap<AddProductDto, Products>();
        CreateMap<ProductEditDto, Products>();

    }
}