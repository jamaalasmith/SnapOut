using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    // Mock user data
    private static readonly List<object> Users = new()
    {
        new { Id = 1, Name = "Alex Johnson", Email = "alex@example.com", CreatedAt = DateTime.UtcNow.AddDays(-30) },
        new { Id = 2, Name = "Sarah Wilson", Email = "sarah@example.com", CreatedAt = DateTime.UtcNow.AddDays(-15) },
        new { Id = 3, Name = "Mike Chen", Email = "mike@example.com", CreatedAt = DateTime.UtcNow.AddDays(-7) }
    };

    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(new { users = Users, count = Users.Count });
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        var user = Users.FirstOrDefault(u => ((dynamic)u).Id == id);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }
        return Ok(user);
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] object userData)
    {
        var newUser = new { 
            Id = Users.Count + 1, 
            Name = "New User", 
            Email = "newuser@example.com", 
            CreatedAt = DateTime.UtcNow 
        };
        
        return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUser);
    }
}