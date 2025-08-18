using api.Models;
using api.Services.Interfaces;

namespace api.Services;

public class PostService : IPostService
{
    // Mock post data
    private static readonly List<Post> Posts =
    [
        new Post
        {
            Id = 1,
            Title = "Welcome to SnapOut!",
            Content = "This is our first post on the new platform.",
            AuthorId = 1,
            AuthorName = "Jamaal Smith",
            CreatedAt = DateTime.UtcNow.AddHours(-2),
            Likes = 5
        },
        new Post
        {
            Id = 2,
            Title = "Building the future",
            Content = "Excited to be working on this amazing project.",
            AuthorId = 2,
            AuthorName = "Sarah Smith",
            CreatedAt = DateTime.UtcNow.AddHours(-1),
            Likes = 3
        },
        new Post
        {
            Id = 3,
            Title = "Great progress today",
            Content = "The API is coming together nicely!",
            AuthorId = 3,
            AuthorName = "Mike Chen",
            CreatedAt = DateTime.UtcNow.AddMinutes(-30),
            Likes = 8
        }
    ];

    public async Task<IEnumerable<Post>> GetAllPostsAsync()
    {
        return await Task.FromResult(Posts.OrderByDescending(p => p.CreatedAt));
    }

    public async Task<Post?> GetPostByIdAsync(int id)
    {
        var post = Posts.FirstOrDefault(p => p.Id == id);
        return await Task.FromResult(post);
    }

    public async Task<Post> CreatePostAsync(object postData)
    {
        var newPost = new Post
        {
            Id = Posts.Count + 1,
            Title = "New Post",
            Content = "This is a new post created via API",
            AuthorId = 1,
            AuthorName = "API User",
            CreatedAt = DateTime.UtcNow,
            Likes = 0
        };

        return await Task.FromResult(newPost);
    }

    public async Task<IEnumerable<Post>> GetPostsByUserAsync(int userId)
    {
        var userPosts = Posts.Where(p => p.AuthorId == userId);
        return await Task.FromResult(userPosts);
    }
}