using System.ComponentModel.DataAnnotations;

namespace api.Models.DTOs.Post;

public class CreatePostDto
{
    [Required]
    [MaxLength(500)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    public string Content { get; set; } = string.Empty;
    
    public string? ImageUrl { get; set; }
    
    public bool IsPublished { get; set; } = true;
    
    public List<int> TagIds { get; set; } = new List<int>();
}