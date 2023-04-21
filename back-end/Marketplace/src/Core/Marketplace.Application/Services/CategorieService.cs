using Markerplace.Domain.Entities;
using Marketplace.Application.Models.CategorieModels.Dtos;
using Marketplace.Application.Models.CategorieModels.Interfaces;

namespace Marketplace.Application.Services;

public class CategorieService :ICategorieService
{
    private readonly ICategorieRepository _categorieRepository;

    public CategorieService(ICategorieRepository categorieRepository)
    {
        _categorieRepository = categorieRepository;
    }
    
    public async Task<List<Categories>> GetCategories()
    {
       return await _categorieRepository.GetAll();
    }
}