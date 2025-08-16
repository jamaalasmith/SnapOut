using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Models.Entities;

namespace api.Data;

public class SnapOutDbContext : IdentityDbContext<User, IdentityRole, string>
{
    public SnapOutDbContext(DbContextOptions<SnapOutDbContext> options) : base(options)
    {
    }

    // DbSets for your entities
    public DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Like> Likes { get; set; }
    public DbSet<Follow> Follows { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<PostTag> PostTags { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // User configuration
        builder.Entity<User>(entity =>
        {
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.LastName).HasMaxLength(100);
        });

        // Post configuration
        builder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Content).IsRequired();
            
            entity.HasOne(p => p.User)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(p => p.CreatedAt);
            entity.HasIndex(p => p.UserId);
        });

        // Comment configuration
        builder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Content).IsRequired().HasMaxLength(1000);
            
            entity.HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            entity.HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(c => c.PostId);
            entity.HasIndex(c => c.UserId);
        });

        // Like configuration
        builder.Entity<Like>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.HasOne(l => l.User)
                .WithMany(u => u.Likes)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            entity.HasOne(l => l.Post)
                .WithMany(p => p.Likes)
                .HasForeignKey(l => l.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            // Ensure user can only like a post once
            entity.HasIndex(l => new { l.UserId, l.PostId }).IsUnique();
        });

        // Follow configuration
        builder.Entity<Follow>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            entity.HasOne(f => f.Follower)
                .WithMany(u => u.Following)
                .HasForeignKey(f => f.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasOne(f => f.Following)
                .WithMany(u => u.Followers)
                .HasForeignKey(f => f.FollowingId)
                .OnDelete(DeleteBehavior.Restrict);

            // Ensure user can only follow another user once
            entity.HasIndex(f => new { f.FollowerId, f.FollowingId }).IsUnique();
            
            // Prevent self-following
            entity.HasCheckConstraint("CK_Follow_NoSelfFollow", "FollowerId != FollowingId");
        });

        // Tag configuration
        builder.Entity<Tag>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(50);
            entity.HasIndex(e => e.Name).IsUnique();
        });

        // PostTag configuration (Many-to-Many)
        builder.Entity<PostTag>(entity =>
        {
            entity.HasKey(pt => new { pt.PostId, pt.TagId });
            
            entity.HasOne(pt => pt.Post)
                .WithMany(p => p.PostTags)
                .HasForeignKey(pt => pt.PostId)
                .OnDelete(DeleteBehavior.Cascade);
            
            entity.HasOne(pt => pt.Tag)
                .WithMany(t => t.PostTags)
                .HasForeignKey(pt => pt.TagId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // UserProfile configuration (One-to-One)
        builder.Entity<UserProfile>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Bio).HasMaxLength(500);
            
            entity.HasOne(up => up.User)
                .WithOne(u => u.Profile)
                .HasForeignKey<UserProfile>(up => up.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(up => up.UserId).IsUnique();
        });

        // Seed some initial data
        builder.Entity<Tag>().HasData(
            new Tag { Id = 1, Name = "Technology", Color = "#3B82F6", CreatedAt = DateTime.UtcNow },
            new Tag { Id = 2, Name = "Lifestyle", Color = "#10B981", CreatedAt = DateTime.UtcNow },
            new Tag { Id = 3, Name = "Business", Color = "#F59E0B", CreatedAt = DateTime.UtcNow },
            new Tag { Id = 4, Name = "Travel", Color = "#EF4444", CreatedAt = DateTime.UtcNow }
        );
    }
}