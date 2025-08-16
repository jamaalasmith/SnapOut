using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    // Mock post data
    private static readonly List<object> Posts = new()
    {
        new { 
            Id = 1, 
            Title = "Welcome to SnapOut!", 
            Content = "This is our first post on the new platform.", 
            AuthorId = 1,
            AuthorName = "Alex Johnson",
            CreatedAt = DateTime.UtcNow.AddHours(-2),
            Likes = 5
        },
        new { 
            Id = 2, 
            Title = "Building the future", 
            Content = "Excited to be working on this amazing project.", 
            AuthorId = 2,
            AuthorName = "Sarah Wilson",
            CreatedAt = DateTime.UtcNow.AddHours(-1),
            Likes = 3
        },
        new { 
            Id = 3, 
            Title = "Great progress today", 
            Content = "The API is coming together nicely!", 
            AuthorId = 3,
            AuthorName = "Mike Chen",
            CreatedAt = DateTime.UtcNow.AddMinutes(-30),
            Likes = 8
        }
    };

    [HttpGet]
    public IActionResult GetPosts()
    {
        return Ok(new { posts = Posts.OrderByDescending(p => ((dynamic)p).CreatedAt), count = Posts.Count });
    }

    [HttpGet("{id}")]
    public IActionResult GetPost(int id)
    {
        var post = Posts.FirstOrDefault(p => ((dynamic)p).Id == id);
        if (post == null)
        {
            return NotFound(new { message = "Post not found" });
        }
        return Ok(post);
    }

    [HttpPost]
    public IActionResult CreatePost([FromBody] object postData)
    {
        var newPost = new { 
            Id = Posts.Count + 1, 
            Title = "New Post", 
            Content = "This is a new post created via API", 
            AuthorId = 1,
            AuthorName = "API User",
            CreatedAt = DateTime.UtcNow,
            Likes = 0
        };
        
        return CreatedAtAction(nameof(GetPost), new { id = newPost.Id }, newPost);
    }

    [HttpGet("user/{userId}")]
    public IActionResult GetPostsByUser(int userId)
    {
        var userPosts = Posts.Where(p => ((dynamic)p).AuthorId == userId);
        return Ok(new { posts = userPosts, count = userPosts.Count() });
    }
}