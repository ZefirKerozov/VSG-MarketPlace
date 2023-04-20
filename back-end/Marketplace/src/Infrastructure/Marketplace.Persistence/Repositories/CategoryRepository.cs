using Markerplace.Domain.Entities;
using Marketplace.Application.Models.CategorieModels.Dtos;
using Marketplace.Application.Models.CategorieModels.Interfaces;
using Marketplace.Application.Models.GenericRepository;

namespace Marketplace.Persistence.Repositories;

public class CategoryRepository :GenericRepository<Categories>, ICategorieRepository
{
    public CategoryRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
    {
    }
}