using api.Models;

namespace api.Services.Interfaces;

public interface IPostService
{
    Task<IEnumerable<Post>> GetAllPostsAsync();
    Task<Post?> GetPostByIdAsync(int id);
    Task<Post> CreatePostAsync(object postData);
    Task<IEnumerable<Post>> GetPostsByUserAsync(int userId);
}