using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using api.Models.DTOs.Post;
using api.Services.Interfaces;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly IPostService _postService;

    public PostsController(IPostService postService)
    {
        _postService = postService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostDto>>> GetPosts([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var posts = await _postService.GetAllAsync(page, pageSize);
            return Ok(posts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while retrieving posts", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PostDto>> GetPost(int id)
    {
        try
        {
            var post = await _postService.GetByIdAsync(id);
            
            if (post == null)
                return NotFound(new { message = "Post not found" });

            return Ok(post);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while retrieving the post", error = ex.Message });
        }
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<PostDto>>> GetPostsByUser(string userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var posts = await _postService.GetByUserIdAsync(userId, page, pageSize);
            return Ok(posts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while retrieving user posts", error = ex.Message });
        }
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<PostDto>> CreatePost([FromBody] CreatePostDto createPostDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "User not authenticated" });

            var post = await _postService.CreateAsync(createPostDto, userId);
            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while creating the post", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<PostDto>> UpdatePost(int id, [FromBody] CreatePostDto updatePostDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "User not authenticated" });

            var post = await _postService.UpdateAsync(id, updatePostDto, userId);
            
            if (post == null)
                return NotFound(new { message = "Post not found or you don't have permission to update it" });

            return Ok(post);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while updating the post", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult> DeletePost(int id)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "User not authenticated" });

            var success = await _postService.DeleteAsync(id, userId);
            
            if (!success)
                return NotFound(new { message = "Post not found or you don't have permission to delete it" });

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while deleting the post", error = ex.Message });
        }
    }

    [HttpPost("{id}/like")]
    [Authorize]
    public async Task<ActionResult> LikePost(int id)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "User not authenticated" });

            var success = await _postService.LikePostAsync(id, userId);
            
            if (!success)
                return BadRequest(new { message = "Post already liked or not found" });

            return Ok(new { message = "Post liked successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while liking the post", error = ex.Message });
        }
    }

    [HttpDelete("{id}/like")]
    [Authorize]
    public async Task<ActionResult> UnlikePost(int id)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "User not authenticated" });

            var success = await _postService.UnlikePostAsync(id, userId);
            
            if (!success)
                return BadRequest(new { message = "Post not liked or not found" });

            return Ok(new { message = "Post unliked successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while unliking the post", error = ex.Message });
        }
    }
}