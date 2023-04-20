using Markerplace.Domain.Entities;
using Marketplace.Application.Models.CategorieModels.Dtos;

namespace Marketplace.Application.Models.CategorieModels.Interfaces;

public interface ICategorieService
{
    List<Categories> GetCategories();
}