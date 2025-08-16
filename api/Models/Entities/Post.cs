using System.ComponentModel.DataAnnotations;

namespace api.Models.Entities
{
    public class Post
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(500)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        public string? ImageUrl { get; set; }
        
        public bool IsPublished { get; set; } = true;
        
        public int LikesCount { get; set; } = 0;
        
        public int CommentsCount { get; set; } = 0;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Foreign key
        public string UserId { get; set; } = string.Empty;
        
        // Navigation properties
        public User User { get; set; } = null!;
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<Like> Likes { get; set; } = new List<Like>();
        public ICollection<PostTag> PostTags { get; set; } = new List<PostTag>();
    }
}