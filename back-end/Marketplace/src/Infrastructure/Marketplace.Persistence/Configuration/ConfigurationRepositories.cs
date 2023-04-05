using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.ProductModels.Interface;
using Marketplace.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Marketplace.Persistence.Configuration;

public static class ConfigurationRepositories
{
    public static IServiceCollection AddConfigurationRepositories(this IServiceCollection services)
    {
        services.AddScoped<IProductRepository, ProductRepository>();
        return services;
    }
}