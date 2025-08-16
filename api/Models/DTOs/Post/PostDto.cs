using api.Models.DTOs.User;

namespace api.Models.DTOs.Post;

public class PostDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public bool IsPublished { get; set; }
    public int LikesCount { get; set; }
    public int CommentsCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public UserDto User { get; set; } = null!;
    public List<string> Tags { get; set; } = new List<string>();
}