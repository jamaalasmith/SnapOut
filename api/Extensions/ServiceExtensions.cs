using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using api.Services;
using api.Services.Interfaces;
using api.Mappings;

namespace api.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Database
        services.AddDbContext<SnapOutDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        // Identity
        services.AddIdentity<User, IdentityRole>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequiredLength = 8;
            options.User.RequireUniqueEmail = true;
        })
        .AddEntityFrameworkStores<SnapOutDbContext>()
        .AddDefaultTokenProviders();

        // AutoMapper
        services.AddAutoMapper(typeof(MappingProfile));

        // Application Services
        services.AddScoped<IPostService, PostService>();
        services.AddScoped<IUserService, UserService>();

        // Controllers
        services.AddControllers();

        // CORS
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });

        // OpenAPI/Swagger
        services.AddOpenApi();

        return services;
    }

    public static WebApplication ConfigureApplication(this WebApplication app)
    {
        // Configure the HTTP request pipeline
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseHttpsRedirection();
        app.UseCors("AllowAll");

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        return app;
    }
}