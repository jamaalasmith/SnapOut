using System.ComponentModel.DataAnnotations;

namespace api.Models.Entities
{
    public class Tag
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        
        public string Color { get; set; } = "#3B82F6"; // Default blue
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public ICollection<PostTag> PostTags { get; set; } = new List<PostTag>();
    }
}