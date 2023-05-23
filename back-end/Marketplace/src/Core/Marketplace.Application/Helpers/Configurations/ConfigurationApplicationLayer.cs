using System.Reflection;
using FluentValidation;
using Markerplace.Domain.Entities;
using Marketplace.Application.Models.OrderModels.Interfaces;
using Marketplace.Application.Models.ProductModels.Interface;
using Marketplace.Application.Services;
using Microsoft.Extensions.DependencyInjection;
using Marketplace.Application.Helpers.Profiles;
using Marketplace.Application.Helpers.Validators;
using Marketplace.Application.Models.CategorieModels.Interfaces;
using Marketplace.Application.Models.ImageModels.Interface;
using Marketplace.Application.Models.LocationModels.Interfaces;
using Marketplace.Application.Models.OrderModels.Dtos;
using Marketplace.Application.Models.ProductModels.Dtos;

namespace Marketplace.Application.Helpers.Configurations;
using StackExchange.Redis;
public static class ConfigurationApplicationLayer
{
    public static IServiceCollection AddConfigurationApplicationLayer(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(ProductProfile).Assembly);
        services.AddAutoMapper(typeof(LocationModel).Assembly);
        services.AddAutoMapper(typeof(OrderProfile).Assembly);
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IOrderService, OrdersService>();
        services.AddScoped<IImageService, ImageService>();
        services.AddScoped<ICategorieService, CategorieService>();
        services.AddScoped<ILocationService, LocationService>();

        
        services.AddScoped<IValidator<CreateOrderDto>, CreateOrderValidator>();
        services.AddScoped<IValidator<AddProductDto>, CreateProductValidator>();
        services.AddScoped<IValidator<ProductEditDto>, EditProductValidator>();
        return services;

    }
}