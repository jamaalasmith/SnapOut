using Microsoft.AspNetCore.Mvc;
using api.Services.Interfaces;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class PostsController : ControllerBase
{
    private readonly IPostService _postService;

    public PostsController(IPostService postService)
    {
        _postService = postService;
    }


    /// <summary>
    /// Get every single post
    /// </summary>
    /// <response code="200">Returns list of all posts with count</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPosts()
    {
        var posts = await _postService.GetAllPostsAsync();
        return Ok(new { posts, count = posts.Count() });
    }

    /// <summary>
    /// Get a specific post by ID
    /// </summary>
    /// <param name="id">Post ID</param>
    /// <response code="200">Returns the requested post details</response>
    /// <response code="404">If the post is not found</response>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetPost(int id)
    {
        var post = await _postService.GetPostByIdAsync(id);
        if (post == null)
        {
            return NotFound(new { message = "Post not found" });
        }
        return Ok(post);
    }

    /// <summary>
    /// Create a new post
    /// </summary>
    /// <param name="postData">Post data</param>
    /// <response code="201">Returns the newly created post</response>
    /// <response code="400">If the post data is invalid</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreatePost([FromBody] object postData)
    {
        var newPost = await _postService.CreatePostAsync(postData);
        return CreatedAtAction(nameof(GetPost), new { id = newPost.Id }, newPost);
    }

    /// <summary>
    /// Get all posts by a specific user
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <response code="200">Returns list of posts by the specified user with count</response>
    [HttpGet("user/{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPostsByUser(int userId)
    {
        var userPosts = await _postService.GetPostsByUserAsync(userId);
        return Ok(new { posts = userPosts, count = userPosts.Count() });
    }
}