namespace api.Models.Entities
{
    public class Like
    {
        public int Id { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Foreign keys
        public string UserId { get; set; } = string.Empty;
        public int PostId { get; set; }
        
        // Navigation properties
        public User User { get; set; } = null!;
        public Post Post { get; set; } = null!;
    }
}