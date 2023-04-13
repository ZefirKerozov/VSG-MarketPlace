using Markerplace.Domain.Enums;
using Marketplace.Application.Models.GenericRepository;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Marketplace.Application.Models.ProductModels.Interface;
using Marketplace.Application.Services;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using Marketplace.Application.Helpers.Profiles;

namespace Marketplace.Application.Helpers.Configurations;

public static class ConfigurationApplicationLayer
{
    public static IServiceCollection AddConfigurationApplicationLayer(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(ProductProfile).Assembly);
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IOrderService, OrdersService>();
        return services;

    }
}