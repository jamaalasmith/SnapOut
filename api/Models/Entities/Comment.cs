using System.ComponentModel.DataAnnotations;

namespace api.Models.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(1000)]
        public string Content { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Foreign keys
        public string UserId { get; set; } = string.Empty;
        public int PostId { get; set; }
        
        // Navigation properties
        public User User { get; set; } = null!;
        public Post Post { get; set; } = null!;
    }
}