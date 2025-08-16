using api.Models.DTOs.User;

namespace api.Services.Interfaces;

public interface IUserService
{
    Task<UserDto?> GetByIdAsync(string userId);
    Task<UserProfileDto?> GetProfileAsync(string userId);
    Task<UserProfileDto?> UpdateProfileAsync(string userId, UserProfileDto profileDto);
    Task<IEnumerable<UserDto>> SearchUsersAsync(string searchTerm, int page = 1, int pageSize = 10);
    Task<bool> FollowUserAsync(string followerId, string followingId);
    Task<bool> UnfollowUserAsync(string followerId, string followingId);
    Task<IEnumerable<UserDto>> GetFollowersAsync(string userId, int page = 1, int pageSize = 10);
    Task<IEnumerable<UserDto>> GetFollowingAsync(string userId, int page = 1, int pageSize = 10);
}