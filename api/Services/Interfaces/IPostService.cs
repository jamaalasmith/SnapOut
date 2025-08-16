using api.Models.DTOs.Post;

namespace api.Services.Interfaces;

public interface IPostService
{
    Task<IEnumerable<PostDto>> GetAllAsync(int page = 1, int pageSize = 10);
    Task<PostDto?> GetByIdAsync(int id);
    Task<PostDto> CreateAsync(CreatePostDto createPostDto, string userId);
    Task<PostDto?> UpdateAsync(int id, CreatePostDto updatePostDto, string userId);
    Task<bool> DeleteAsync(int id, string userId);
    Task<IEnumerable<PostDto>> GetByUserIdAsync(string userId, int page = 1, int pageSize = 10);
    Task<bool> LikePostAsync(int postId, string userId);
    Task<bool> UnlikePostAsync(int postId, string userId);
}