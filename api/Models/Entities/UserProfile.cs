using System.ComponentModel.DataAnnotations;

namespace api.Models.Entities
{
    public class UserProfile
    {
        public int Id { get; set; }
        
        [MaxLength(500)]
        public string? Bio { get; set; }
        
        public string? AvatarUrl { get; set; }
        
        public string? Website { get; set; }
        
        public string? Location { get; set; }
        
        public DateTime? DateOfBirth { get; set; }
        
        public bool IsPrivate { get; set; } = false;
        
        public int FollowersCount { get; set; } = 0;
        
        public int FollowingCount { get; set; } = 0;
        
        public int PostsCount { get; set; } = 0;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Foreign key - One-to-One with User
        public string UserId { get; set; } = string.Empty;
        
        // Navigation property
        public User User { get; set; } = null!;
    }
}