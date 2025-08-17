using api.Models;
using api.Services.Interfaces;

namespace api.Services;

public class UserService : IUserService
{
    // Mock user data
    private static readonly List<User> Users = new()
    {
        new User { Id = 1, Name = "Alex Johnson", Email = "alex@example.com", CreatedAt = DateTime.UtcNow.AddDays(-30) },
        new User { Id = 2, Name = "Sarah Wilson", Email = "sarah@example.com", CreatedAt = DateTime.UtcNow.AddDays(-15) },
        new User { Id = 3, Name = "Mike Chen", Email = "mike@example.com", CreatedAt = DateTime.UtcNow.AddDays(-7) }
    };

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await Task.FromResult(Users);
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        var user = Users.FirstOrDefault(u => u.Id == id);
        return await Task.FromResult(user);
    }

    public async Task<User> CreateUserAsync(object userData)
    {
        var newUser = new User
        {
            Id = Users.Count + 1,
            Name = "New User",
            Email = "newuser@example.com",
            CreatedAt = DateTime.UtcNow
        };

        return await Task.FromResult(newUser);
    }
}