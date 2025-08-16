using AutoMapper;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using api.Models.Entities;
using api.Models.DTOs.User;
using api.Services.Interfaces;

namespace api.Services;

public class UserService : IUserService
{
    private readonly SnapOutDbContext _context;
    private readonly IMapper _mapper;

    public UserService(SnapOutDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<UserDto?> GetByIdAsync(string userId)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == userId);

        return user == null ? null : _mapper.Map<UserDto>(user);
    }

    public async Task<UserProfileDto?> GetProfileAsync(string userId)
    {
        var userProfile = await _context.UserProfiles
            .Include(up => up.User)
            .FirstOrDefaultAsync(up => up.UserId == userId);

        if (userProfile == null)
        {
            // Create default profile if it doesn't exist
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return null;

            userProfile = new UserProfile
            {
                UserId = userId,
                User = user,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.UserProfiles.Add(userProfile);
            await _context.SaveChangesAsync();
        }

        return _mapper.Map<UserProfileDto>(userProfile);
    }

    public async Task<UserProfileDto?> UpdateProfileAsync(string userId, UserProfileDto profileDto)
    {
        var userProfile = await _context.UserProfiles
            .Include(up => up.User)
            .FirstOrDefaultAsync(up => up.UserId == userId);

        if (userProfile == null)
        {
            // Create profile if it doesn't exist
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return null;

            userProfile = new UserProfile
            {
                UserId = userId,
                User = user,
                CreatedAt = DateTime.UtcNow
            };
            _context.UserProfiles.Add(userProfile);
        }

        // Update profile fields
        userProfile.Bio = profileDto.Bio;
        userProfile.AvatarUrl = profileDto.AvatarUrl;
        userProfile.Website = profileDto.Website;
        userProfile.Location = profileDto.Location;
        userProfile.DateOfBirth = profileDto.DateOfBirth;
        userProfile.IsPrivate = profileDto.IsPrivate;
        userProfile.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return _mapper.Map<UserProfileDto>(userProfile);
    }

    public async Task<IEnumerable<UserDto>> SearchUsersAsync(string searchTerm, int page = 1, int pageSize = 10)
    {
        var users = await _context.Users
            .Where(u => u.FirstName!.Contains(searchTerm) || 
                       u.LastName!.Contains(searchTerm) || 
                       u.Email!.Contains(searchTerm))
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return _mapper.Map<IEnumerable<UserDto>>(users);
    }

    public async Task<bool> FollowUserAsync(string followerId, string followingId)
    {
        if (followerId == followingId)
            return false; // Can't follow yourself

        var existingFollow = await _context.Follows
            .FirstOrDefaultAsync(f => f.FollowerId == followerId && f.FollowingId == followingId);

        if (existingFollow != null)
            return false; // Already following

        var follow = new Follow
        {
            FollowerId = followerId,
            FollowingId = followingId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Follows.Add(follow);

        // Update counts
        var followerProfile = await _context.UserProfiles
            .FirstOrDefaultAsync(up => up.UserId == followerId);
        var followingProfile = await _context.UserProfiles
            .FirstOrDefaultAsync(up => up.UserId == followingId);

        if (followerProfile != null)
            followerProfile.FollowingCount++;

        if (followingProfile != null)
            followingProfile.FollowersCount++;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UnfollowUserAsync(string followerId, string followingId)
    {
        var follow = await _context.Follows
            .FirstOrDefaultAsync(f => f.FollowerId == followerId && f.FollowingId == followingId);

        if (follow == null)
            return false; // Not following

        _context.Follows.Remove(follow);

        // Update counts
        var followerProfile = await _context.UserProfiles
            .FirstOrDefaultAsync(up => up.UserId == followerId);
        var followingProfile = await _context.UserProfiles
            .FirstOrDefaultAsync(up => up.UserId == followingId);

        if (followerProfile != null)
            followerProfile.FollowingCount = Math.Max(0, followerProfile.FollowingCount - 1);

        if (followingProfile != null)
            followingProfile.FollowersCount = Math.Max(0, followingProfile.FollowersCount - 1);

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<UserDto>> GetFollowersAsync(string userId, int page = 1, int pageSize = 10)
    {
        var followers = await _context.Follows
            .Include(f => f.Follower)
            .Where(f => f.FollowingId == userId)
            .Select(f => f.Follower)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return _mapper.Map<IEnumerable<UserDto>>(followers);
    }

    public async Task<IEnumerable<UserDto>> GetFollowingAsync(string userId, int page = 1, int pageSize = 10)
    {
        var following = await _context.Follows
            .Include(f => f.Following)
            .Where(f => f.FollowerId == userId)
            .Select(f => f.Following)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return _mapper.Map<IEnumerable<UserDto>>(following);
    }
}