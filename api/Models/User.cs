using Microsoft.AspNetCore.Identity;
using api.Models.Entities;

namespace api.Models;

public class User : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public UserProfile? Profile { get; set; }
    public ICollection<Post> Posts { get; set; } = new List<Post>();
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public ICollection<Like> Likes { get; set; } = new List<Like>();
    
    // Following relationships
    public ICollection<Follow> Followers { get; set; } = new List<Follow>();
    public ICollection<Follow> Following { get; set; } = new List<Follow>();
}