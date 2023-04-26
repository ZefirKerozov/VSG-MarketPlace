using Marketplace.Application.Helpers.Configurations;
using Marketplace.Application.Helpers.Middlewares;
using Marketplace.Persistence.Configuration;
using Marketplace.Persistence.Migrations;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.OpenApi.Models;
using NLog.Web;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddConfigurationApplicationLayer();
builder.Services.AddConfigurationRepositories();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Marketplace", Version = "v1" });
    c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
    
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORSPolicy", policy =>
    {
        policy
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("*");
    });
});
builder.Services.AddConfigurationMigration();
builder.Host.ConfigureLogging(logging => { logging.ClearProviders(); }).UseNLog();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
DatabaseCreate.Create(app.Services.GetRequiredService<IConfiguration>());

app.MigrateUpDatabase();

app.UseCors("CORSPolicy");
app.UseHttpsRedirection();

app.UseAuthorization();

app.UseMiddleware<ExceptionHandlingMIddleware>();

app.MapControllers();

app.Run();