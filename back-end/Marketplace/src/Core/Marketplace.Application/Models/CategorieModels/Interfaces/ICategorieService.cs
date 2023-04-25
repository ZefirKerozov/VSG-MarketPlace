using Markerplace.Domain.Entities;
using Marketplace.Application.Models.CategorieModels.Dtos;

namespace Marketplace.Application.Models.CategorieModels.Interfaces;

public interface ICategorieService
{
    Task<List<Category>> GetCategories();
    
    Task AddCategorie(string name);

}