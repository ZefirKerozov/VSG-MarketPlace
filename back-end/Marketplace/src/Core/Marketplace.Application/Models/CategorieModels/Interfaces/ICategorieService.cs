using Markerplace.Domain.Entities;
using Marketplace.Application.Models.CategorieModels.Dtos;

namespace Marketplace.Application.Models.CategorieModels.Interfaces;

public interface ICategorieService
{
    Task<List<GetAllCategories>> GetCategories();
    
    Task AddCategorie(string name);

    Task DeleteCategory(int categoryId);
}