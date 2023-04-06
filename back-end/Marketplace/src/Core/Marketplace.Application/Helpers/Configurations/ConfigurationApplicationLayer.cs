using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.InventoryModels.Interface;
using Marketplace.Application.Models.ProductModels.Interface;
using Marketplace.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Marketplace.Application.Helpers.Configurations;

public static class ConfigurationApplicationLayer
{
    public static IServiceCollection AddConfigurationApplicationLayer(this IServiceCollection services)
    {
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IInvertoryService, InvertoryService>();

        return services;

    }
}