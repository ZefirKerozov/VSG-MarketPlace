using FluentMigrator.Runner;
using Marketplace.Persistence.Migrations;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Marketplace.Persistence.Configuration;

public static class ConfigurationMigration
{
    public static IServiceCollection AddConfigurationMigration(this IServiceCollection services)
    {
        services.AddFluentMigratorCore()
            .ConfigureRunner(conf => conf.AddSqlServer()
                .WithGlobalConnectionString("DefaultConnection")
                .ScanIn(typeof(_01_CategoryTable).Assembly).For.Migrations());

        return services;
    }

    public static void MigrateUpDatabase(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var migrator = scope.ServiceProvider.GetService<IMigrationRunner>();
        migrator.MigrateUp();
    }
}