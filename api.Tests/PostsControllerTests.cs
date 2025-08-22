using Microsoft.AspNetCore.Mvc;
using Moq;
using api.Controllers;
using api.Services.Interfaces;
using api.Models;

namespace api.Tests;

public class PostsControllerTests
{
    private readonly Mock<IPostService> _mockPostService;
    private readonly PostsController _controller;

    public PostsControllerTests()
    {
        _mockPostService = new Mock<IPostService>();
        _controller = new PostsController(_mockPostService.Object);
    }

    [Fact]
    public async Task GetPosts_ReturnsOkResult_WithPostsAndCount()
    {
        // Arrange
        var posts = new List<Post>
        {
            new Post { Id = 1, Title = "Test Post 1", Content = "Content 1", AuthorId = 1, AuthorName = "Author 1", CreatedAt = DateTime.UtcNow, Likes = 5 },
            new Post { Id = 2, Title = "Test Post 2", Content = "Content 2", AuthorId = 2, AuthorName = "Author 2", CreatedAt = DateTime.UtcNow, Likes = 3 }
        };

        _mockPostService.Setup(x => x.GetAllPostsAsync()).ReturnsAsync(posts);

        // Act
        var result = await _controller.GetPosts();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = okResult.Value;
        
        // Use reflection to get the posts and count from the anonymous object
        var postsProperty = returnValue.GetType().GetProperty("posts");
        var countProperty = returnValue.GetType().GetProperty("count");
        
        Assert.NotNull(postsProperty);
        Assert.NotNull(countProperty);
        
        var returnedPosts = (IEnumerable<Post>)postsProperty.GetValue(returnValue);
        var returnedCount = (int)countProperty.GetValue(returnValue);
        
        Assert.Equal(2, returnedCount);
        Assert.Equal(posts, returnedPosts);
    }

    [Fact]
    public async Task GetPost_ExistingId_ReturnsOkResult_WithPost()
    {
        // Arrange
        var postId = 1;
        var post = new Post { Id = postId, Title = "Test Post", Content = "Test Content", AuthorId = 1, AuthorName = "Test Author", CreatedAt = DateTime.UtcNow, Likes = 5 };

        _mockPostService.Setup(x => x.GetPostByIdAsync(postId)).ReturnsAsync(post);

        // Act
        var result = await _controller.GetPost(postId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(post, okResult.Value);
    }

    [Fact]
    public async Task GetPost_NonExistingId_ReturnsNotFound()
    {
        // Arrange
        var postId = 999;
        _mockPostService.Setup(x => x.GetPostByIdAsync(postId)).ReturnsAsync((Post)null);

        // Act
        var result = await _controller.GetPost(postId);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
        var returnValue = notFoundResult.Value;
        
        var messageProperty = returnValue.GetType().GetProperty("message");
        Assert.NotNull(messageProperty);
        Assert.Equal("Post not found", messageProperty.GetValue(returnValue));
    }

    [Fact]
    public async Task CreatePost_ReturnsCreatedAtAction()
    {
        // Arrange
        var postData = new { Title = "New Post", Content = "New Content" };
        var createdPost = new Post { Id = 1, Title = "New Post", Content = "New Content", AuthorId = 1, AuthorName = "API User", CreatedAt = DateTime.UtcNow, Likes = 0 };

        _mockPostService.Setup(x => x.CreatePostAsync(It.IsAny<object>())).ReturnsAsync(createdPost);

        // Act
        var result = await _controller.CreatePost(postData);

        // Assert
        var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
        Assert.Equal(nameof(PostsController.GetPost), createdAtActionResult.ActionName);
        Assert.Equal(createdPost.Id, ((dynamic)createdAtActionResult.RouteValues)["id"]);
        Assert.Equal(createdPost, createdAtActionResult.Value);
    }

    [Fact]
    public async Task GetPostsByUser_ReturnsOkResult_WithUserPostsAndCount()
    {
        // Arrange
        var userId = 1;
        var userPosts = new List<Post>
        {
            new Post { Id = 1, Title = "User Post 1", Content = "Content 1", AuthorId = userId, AuthorName = "User", CreatedAt = DateTime.UtcNow, Likes = 2 },
            new Post { Id = 2, Title = "User Post 2", Content = "Content 2", AuthorId = userId, AuthorName = "User", CreatedAt = DateTime.UtcNow, Likes = 4 }
        };

        _mockPostService.Setup(x => x.GetPostsByUserAsync(userId)).ReturnsAsync(userPosts);

        // Act
        var result = await _controller.GetPostsByUser(userId);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnValue = okResult.Value;
        
        var postsProperty = returnValue.GetType().GetProperty("posts");
        var countProperty = returnValue.GetType().GetProperty("count");
        
        Assert.NotNull(postsProperty);
        Assert.NotNull(countProperty);
        
        var returnedPosts = (IEnumerable<Post>)postsProperty.GetValue(returnValue);
        var returnedCount = (int)countProperty.GetValue(returnValue);
        
        Assert.Equal(2, returnedCount);
        Assert.Equal(userPosts, returnedPosts);
    }
}