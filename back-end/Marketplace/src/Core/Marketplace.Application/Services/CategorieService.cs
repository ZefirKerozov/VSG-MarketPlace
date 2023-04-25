using System.Data;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.CategorieModels.Dtos;
using Marketplace.Application.Models.CategorieModels.Interfaces;
using Newtonsoft.Json;
using StackExchange.Redis;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Marketplace.Application.Services;

public class CategorieService : ICategorieService
{
    private readonly ICategorieRepository _categorieRepository;
    private readonly string categoryKey = "category";

    private static readonly ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("localhost:6379");

    private readonly IDatabase db = redis.GetDatabase();

    public CategorieService(ICategorieRepository categorieRepository)
    {
        _categorieRepository = categorieRepository;
    }

    public async Task<List<Category>> GetCategories()
    {
        var value = await db.StringGetAsync(categoryKey);
        if (!String.IsNullOrEmpty(value))
        {
            return JsonSerializer.Deserialize<List<Category>>(value);
        }
        
        
        var newValue = await _categorieRepository.GetAll();
        await db.StringGetSetAsync(categoryKey,JsonSerializer.Serialize(newValue));
        return newValue;
    }

    public async Task AddCategorie(string name)
    {
        var keyExist = db.KeyExists(categoryKey);
        if (keyExist)
        {
           await db.KeyDeleteAsync(categoryKey);
        }
        var category = new Category
        {
            Name = name,
        };
       await _categorieRepository.Create(category);
    }
}