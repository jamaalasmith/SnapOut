namespace api.Models.Entities
{
    public class Follow
    {
        public int Id { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Foreign keys
        public string FollowerId { get; set; } = string.Empty;  // User who follows
        public string FollowingId { get; set; } = string.Empty; // User being followed
        
        // Navigation properties
        public User Follower { get; set; } = null!;
        public User Following { get; set; } = null!;
    }
}