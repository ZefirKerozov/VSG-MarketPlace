using Marketplace.API.Identity;
using Marketplace.API.Swagger;
using Marketplace.Application.Helpers.Configurations;
using Marketplace.Application.Helpers.Middlewares;
using Marketplace.Persistence.Configuration;
using Marketplace.Persistence.Migrations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using NLog.Web;
using Swashbuckle.AspNetCore.SwaggerGen;


var builder = WebApplication.CreateBuilder(args);

IConfigurationRoot config = new ConfigurationBuilder()
    .AddJsonFile(path: "appsettings.json").Build();

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.Authority = builder.Configuration["Auth2:Domain"];
    x.Audience = builder.Configuration["Auth2:Audience"];
});



builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(IdentityData.Admin, p=>p.RequireClaim(IdentityData.Admin,"f2123818-3d51-4fe4-990b-b072a80da143"));
});
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
builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
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


DatabaseCreate.Create(app.Services.GetRequiredService<IConfiguration>());

app.UseSwagger();
app.UseSwaggerUI();
app.MigrateUpDatabase();

app.UseCors("CORSPolicy");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ExceptionHandlingMIddleware>();

app.MapControllers();

app.Run();
