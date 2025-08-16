using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "SnapOut API is running", timestamp = DateTime.UtcNow, version = "1.0.0" });
    }

    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
    }

    [HttpGet("info")]
    public IActionResult Info()
    {
        return Ok(new { 
            api = "SnapOut API",
            environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production",
            timestamp = DateTime.UtcNow,
            endpoints = new[] { "/api/home", "/api/home/health", "/api/home/info", "/api/users", "/api/posts" }
        });
    }
}