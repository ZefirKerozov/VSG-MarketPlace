using Markerplace.Domain.Entities;
using Marketplace.Application.Models.CategorieModels.Interfaces;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.ImageModels.Interface;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Marketplace.Application.Models.ProductModels.Interface;
using Marketplace.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Marketplace.Persistence.Configuration;

public static class ConfigurationRepositories
{
    public static IServiceCollection AddConfigurationRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IOrdersRepository, OrdersRepository>();
        services.AddScoped<IImageRepository, ImageRepository>();
        services.AddScoped<ICategorieRepository, CategoryRepository>();

        return services;
    }
}