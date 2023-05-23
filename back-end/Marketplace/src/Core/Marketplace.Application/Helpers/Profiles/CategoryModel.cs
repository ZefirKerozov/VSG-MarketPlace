using AutoMapper;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.CategorieModels.Dtos;

namespace Marketplace.Application.Helpers.Profiles;

public class CategoryModel:Profile
{
    public CategoryModel()
    {
        CreateMap<Category, GetAllCategories>();
    }
}