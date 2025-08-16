using AutoMapper;
using api.Models;
using api.Models.Entities;
using api.Models.DTOs.User;
using api.Models.DTOs.Post;
using api.Models.DTOs.Auth;

namespace api.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // User mappings
        CreateMap<User, UserDto>();
        CreateMap<RegisterDto, User>
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));
        
        // UserProfile mappings
        CreateMap<UserProfile, UserProfileDto>();
        CreateMap<UserProfileDto, UserProfile>();
        
        // Post mappings
        CreateMap<Post, PostDto>
            .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => 
                src.PostTags.Select(pt => pt.Tag.Name).ToList()));
        
        CreateMap<CreatePostDto, Post>
            .ForMember(dest => dest.PostTags, opt => opt.Ignore())
            .ForMember(dest => dest.User, opt => opt.Ignore())
            .ForMember(dest => dest.UserId, opt => opt.Ignore())
            .ForMember(dest => dest.Comments, opt => opt.Ignore())
            .ForMember(dest => dest.Likes, opt => opt.Ignore());
        
        // Comment mappings
        CreateMap<Comment, CommentDto>();
        
        // Tag mappings
        CreateMap<Tag, TagDto>();
    }
}

// Additional DTOs for mapping
namespace api.Models.DTOs.Post
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public UserDto User { get; set; } = null!;
    }
    
    public class TagDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}