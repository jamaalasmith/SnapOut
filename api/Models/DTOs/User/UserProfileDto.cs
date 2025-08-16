namespace api.Models.DTOs.User;

public class UserProfileDto
{
    public int Id { get; set; }
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public string? Website { get; set; }
    public string? Location { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public bool IsPrivate { get; set; }
    public int FollowersCount { get; set; }
    public int FollowingCount { get; set; }
    public int PostsCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public UserDto User { get; set; } = null!;
}