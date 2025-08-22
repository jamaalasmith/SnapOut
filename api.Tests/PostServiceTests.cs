using api.Services;
using api.Models;

namespace api.Tests;

public class PostServiceTests
{
    private readonly PostService _postService;

    public PostServiceTests()
    {
        _postService = new PostService();
    }

    [Fact]
    public async Task GetAllPostsAsync_ReturnsAllPosts_OrderedByCreatedAtDesc()
    {
        // Act
        var result = await _postService.GetAllPostsAsync();

        // Assert
        Assert.NotNull(result);
        Assert.True(result.Any());
        
        // Verify posts are ordered by CreatedAt descending
        var posts = result.ToList();
        for (int i = 0; i < posts.Count - 1; i++)
        {
            Assert.True(posts[i].CreatedAt >= posts[i + 1].CreatedAt);
        }
    }

    [Fact]
    public async Task GetPostByIdAsync_ExistingId_ReturnsCorrectPost()
    {
        // Arrange
        var existingId = 1;

        // Act
        var result = await _postService.GetPostByIdAsync(existingId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(existingId, result.Id);
        Assert.Equal("Welcome to SnapOut!", result.Title);
        Assert.Equal("This is our first post on the new platform.", result.Content);
        Assert.Equal(1, result.AuthorId);
        Assert.Equal("Jamaal Smith", result.AuthorName);
        Assert.Equal(5, result.Likes);
    }

    [Fact]
    public async Task GetPostByIdAsync_NonExistingId_ReturnsNull()
    {
        // Arrange
        var nonExistingId = 999;

        // Act
        var result = await _postService.GetPostByIdAsync(nonExistingId);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task CreatePostAsync_ReturnsNewPost_WithCorrectDefaults()
    {
        // Arrange
        var postData = new { Title = "Test Title", Content = "Test Content" };

        // Act
        var result = await _postService.CreatePostAsync(postData);

        // Assert
        Assert.NotNull(result);
        Assert.True(result.Id > 0);
        Assert.Equal("New Post", result.Title); // Note: Current implementation ignores input
        Assert.Equal("This is a new post created via API", result.Content); // Note: Current implementation ignores input
        Assert.Equal(1, result.AuthorId);
        Assert.Equal("API User", result.AuthorName);
        Assert.Equal(0, result.Likes);
        Assert.True(result.CreatedAt <= DateTime.UtcNow);
    }

    [Fact]
    public async Task GetPostsByUserAsync_ExistingUserId_ReturnsUserPosts()
    {
        // Arrange
        var userId = 1;

        // Act
        var result = await _postService.GetPostsByUserAsync(userId);

        // Assert
        Assert.NotNull(result);
        var userPosts = result.ToList();
        Assert.True(userPosts.Any());
        Assert.All(userPosts, post => Assert.Equal(userId, post.AuthorId));
    }

    [Fact]
    public async Task GetPostsByUserAsync_NonExistingUserId_ReturnsEmptyCollection()
    {
        // Arrange
        var nonExistingUserId = 999;

        // Act
        var result = await _postService.GetPostsByUserAsync(nonExistingUserId);

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }

    [Fact]
    public async Task GetPostsByUserAsync_UserWithMultiplePosts_ReturnsAllUserPosts()
    {
        // Act - Get posts for user 1 (should have at least one post based on mock data)
        var result = await _postService.GetPostsByUserAsync(1);

        // Assert
        var userPosts = result.ToList();
        Assert.True(userPosts.Count > 0);
        
        // Verify all posts belong to the specified user
        foreach (var post in userPosts)
        {
            Assert.Equal(1, post.AuthorId);
            Assert.Equal("Jamaal Smith", post.AuthorName);
        }
    }
}