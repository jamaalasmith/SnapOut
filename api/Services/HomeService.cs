using api.Services.Interfaces;

namespace api.Services;

public class HomeService : IHomeService
{
    public async Task<object> GetApiStatusAsync()
    {
        return await Task.FromResult(new 
        { 
            message = "SnapOut API is running", 
            timestamp = DateTime.UtcNow, 
            version = "1.0.0" 
        });
    }

    public async Task<object> GetHealthAsync()
    {
        // Could add actual health checks here (database, external services, etc.)
        return await Task.FromResult(new 
        { 
            status = "healthy", 
            timestamp = DateTime.UtcNow 
        });
    }

    public async Task<object> GetApiInfoAsync()
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";
        var endpoints = new[] 
        { 
            "/api/home", 
            "/api/home/health", 
            "/api/home/info", 
            "/api/users", 
            "/api/posts" 
        };

        return await Task.FromResult(new 
        { 
            api = "SnapOut API",
            environment,
            timestamp = DateTime.UtcNow,
            endpoints
        });
    }
}