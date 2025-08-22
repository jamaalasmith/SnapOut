using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using System.Text.Json;
using api.Models;

namespace api.Tests;

public class ApiIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public ApiIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task GetPosts_ReturnsSuccessStatusCode()
    {
        // Act
        var response = await _client.GetAsync("/api/posts");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetPosts_ReturnsValidJsonResponse()
    {
        // Act
        var response = await _client.GetAsync("/api/posts");
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.False(string.IsNullOrEmpty(content));
        
        // Verify it's valid JSON and contains expected structure
        var jsonDocument = JsonDocument.Parse(content);
        var root = jsonDocument.RootElement;
        
        Assert.True(root.TryGetProperty("posts", out _));
        Assert.True(root.TryGetProperty("count", out _));
    }

    [Fact]
    public async Task GetPostById_ExistingId_ReturnsPost()
    {
        // Act
        var response = await _client.GetAsync("/api/posts/1");
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        var jsonDocument = JsonDocument.Parse(content);
        var root = jsonDocument.RootElement;
        
        Assert.True(root.TryGetProperty("id", out var idProperty));
        Assert.Equal(1, idProperty.GetInt32());
        Assert.True(root.TryGetProperty("title", out _));
        Assert.True(root.TryGetProperty("content", out _));
    }

    [Fact]
    public async Task GetPostById_NonExistingId_ReturnsNotFound()
    {
        // Act
        var response = await _client.GetAsync("/api/posts/999");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task GetPostsByUser_ExistingUserId_ReturnsUserPosts()
    {
        // Act
        var response = await _client.GetAsync("/api/posts/user/1");
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        var jsonDocument = JsonDocument.Parse(content);
        var root = jsonDocument.RootElement;
        
        Assert.True(root.TryGetProperty("posts", out var postsProperty));
        Assert.True(root.TryGetProperty("count", out _));
        
        // Verify all posts belong to the requested user
        foreach (var post in postsProperty.EnumerateArray())
        {
            Assert.True(post.TryGetProperty("authorId", out var authorIdProperty));
            Assert.Equal(1, authorIdProperty.GetInt32());
        }
    }

    [Fact]
    public async Task CreatePost_ValidData_ReturnsCreated()
    {
        // Arrange
        var postData = new { Title = "Integration Test Post", Content = "This is a test post" };
        var json = JsonSerializer.Serialize(postData);
        var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

        // Act
        var response = await _client.PostAsync("/api/posts", content);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        
        var responseContent = await response.Content.ReadAsStringAsync();
        var jsonDocument = JsonDocument.Parse(responseContent);
        var root = jsonDocument.RootElement;
        
        Assert.True(root.TryGetProperty("id", out var idProperty));
        Assert.True(idProperty.GetInt32() > 0);
        Assert.True(root.TryGetProperty("title", out _));
        Assert.True(root.TryGetProperty("content", out _));
    }

    [Fact]
    public async Task GetUsers_ReturnsSuccessStatusCode()
    {
        // Act
        var response = await _client.GetAsync("/api/users");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetUsers_ReturnsValidJsonResponse()
    {
        // Act
        var response = await _client.GetAsync("/api/users");
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        response.EnsureSuccessStatusCode();
        
        var jsonDocument = JsonDocument.Parse(content);
        var root = jsonDocument.RootElement;
        
        Assert.True(root.TryGetProperty("users", out _));
        Assert.True(root.TryGetProperty("count", out _));
    }

    [Fact]
    public async Task SwaggerEndpoint_IsAccessible()
    {
        // Act
        var response = await _client.GetAsync("/swagger/index.html");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}