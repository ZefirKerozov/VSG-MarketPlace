using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.InventoryModels.Interface;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Marketplace.Application.Models.ProductModels.Interface;
using Marketplace.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Marketplace.Persistence.Configuration;

public static class ConfigurationRepositories
{
    public static IServiceCollection AddConfigurationRepositories(this IServiceCollection services)
    {
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IInvertoryRepository, InvertoryRepository>();
        services.AddScoped<IOrdersRepository, OrdersRepository>();

        return services;
    }
}