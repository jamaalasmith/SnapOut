using AutoMapper;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models.Entities;
using api.Models.DTOs.Post;
using api.Services.Interfaces;

namespace api.Services;

public class PostService : IPostService
{
    private readonly SnapOutDbContext _context;
    private readonly IMapper _mapper;

    public PostService(SnapOutDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PostDto>> GetAllAsync(int page = 1, int pageSize = 10)
    {
        var posts = await _context.Posts
            .Include(p => p.User)
            .Include(p => p.PostTags)
                .ThenInclude(pt => pt.Tag)
            .Where(p => p.IsPublished)
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return _mapper.Map<IEnumerable<PostDto>>(posts);
    }

    public async Task<PostDto?> GetByIdAsync(int id)
    {
        var post = await _context.Posts
            .Include(p => p.User)
            .Include(p => p.PostTags)
                .ThenInclude(pt => pt.Tag)
            .FirstOrDefaultAsync(p => p.Id == id && p.IsPublished);

        return post == null ? null : _mapper.Map<PostDto>(post);
    }

    public async Task<PostDto> CreateAsync(CreatePostDto createPostDto, string userId)
    {
        var post = _mapper.Map<Post>(createPostDto);
        post.UserId = userId;
        post.CreatedAt = DateTime.UtcNow;
        post.UpdatedAt = DateTime.UtcNow;

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        // Add tags if provided
        if (createPostDto.TagIds.Any())
        {
            var postTags = createPostDto.TagIds.Select(tagId => new PostTag
            {
                PostId = post.Id,
                TagId = tagId
            }).ToList();

            _context.PostTags.AddRange(postTags);
            await _context.SaveChangesAsync();
        }

        // Reload post with includes for mapping
        var createdPost = await _context.Posts
            .Include(p => p.User)
            .Include(p => p.PostTags)
                .ThenInclude(pt => pt.Tag)
            .FirstAsync(p => p.Id == post.Id);

        return _mapper.Map<PostDto>(createdPost);
    }

    public async Task<PostDto?> UpdateAsync(int id, CreatePostDto updatePostDto, string userId)
    {
        var post = await _context.Posts
            .Include(p => p.PostTags)
            .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

        if (post == null)
            return null;

        post.Title = updatePostDto.Title;
        post.Content = updatePostDto.Content;
        post.ImageUrl = updatePostDto.ImageUrl;
        post.IsPublished = updatePostDto.IsPublished;
        post.UpdatedAt = DateTime.UtcNow;

        // Update tags
        _context.PostTags.RemoveRange(post.PostTags);
        
        if (updatePostDto.TagIds.Any())
        {
            var postTags = updatePostDto.TagIds.Select(tagId => new PostTag
            {
                PostId = post.Id,
                TagId = tagId
            }).ToList();

            _context.PostTags.AddRange(postTags);
        }

        await _context.SaveChangesAsync();

        // Reload post with includes for mapping
        var updatedPost = await _context.Posts
            .Include(p => p.User)
            .Include(p => p.PostTags)
                .ThenInclude(pt => pt.Tag)
            .FirstAsync(p => p.Id == post.Id);

        return _mapper.Map<PostDto>(updatedPost);
    }

    public async Task<bool> DeleteAsync(int id, string userId)
    {
        var post = await _context.Posts
            .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

        if (post == null)
            return false;

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<PostDto>> GetByUserIdAsync(string userId, int page = 1, int pageSize = 10)
    {
        var posts = await _context.Posts
            .Include(p => p.User)
            .Include(p => p.PostTags)
                .ThenInclude(pt => pt.Tag)
            .Where(p => p.UserId == userId && p.IsPublished)
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return _mapper.Map<IEnumerable<PostDto>>(posts);
    }

    public async Task<bool> LikePostAsync(int postId, string userId)
    {
        var existingLike = await _context.Likes
            .FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId);

        if (existingLike != null)
            return false; // Already liked

        var like = new Like
        {
            PostId = postId,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Likes.Add(like);

        // Update post likes count
        var post = await _context.Posts.FindAsync(postId);
        if (post != null)
        {
            post.LikesCount++;
        }

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UnlikePostAsync(int postId, string userId)
    {
        var like = await _context.Likes
            .FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId);

        if (like == null)
            return false; // Not liked

        _context.Likes.Remove(like);

        // Update post likes count
        var post = await _context.Posts.FindAsync(postId);
        if (post != null)
        {
            post.LikesCount = Math.Max(0, post.LikesCount - 1);
        }

        await _context.SaveChangesAsync();
        return true;
    }
}