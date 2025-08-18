using Microsoft.AspNetCore.Mvc;
using api.Services.Interfaces;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    private readonly IHomeService _homeService;

    public HomeController(IHomeService homeService)
    {
        _homeService = homeService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _homeService.GetApiStatusAsync();
        return Ok(result);
    }

    [HttpGet("health")]
    public async Task<IActionResult> Health()
    {
        var result = await _homeService.GetHealthAsync();
        return Ok(result);
    }

    [HttpGet("info")]
    public async Task<IActionResult> Info()
    {
        var result = await _homeService.GetApiInfoAsync();
        return Ok(result);
    }
}