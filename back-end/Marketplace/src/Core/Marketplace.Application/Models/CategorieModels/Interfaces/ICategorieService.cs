using Markerplace.Domain.Entities;
using Marketplace.Application.Models.CategorieModels.Dtos;

namespace Marketplace.Application.Models.CategorieModels.Interfaces;

public interface ICategorieService
{
    Task<List<Categories>> GetCategories();
    
    Task AddCategorie(string name);

}