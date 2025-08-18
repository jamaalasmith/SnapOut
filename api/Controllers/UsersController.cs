using Microsoft.AspNetCore.Mvc;
using api.Services.Interfaces;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = _userService.GetAllUsers();
        return Ok(new { users, count = users.Count() });
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        var user = _userService.GetUserById(id);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }
        return Ok(user);
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] object userData)
    {
        var newUser = _userService.CreateUser(userData);
        return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUser);
    }
}