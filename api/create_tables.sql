-- SnapOut Database Schema
-- Create tables for User and Post models

-- Drop tables if they exist (for clean re-creation)
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Users;

-- Create Users table
CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Posts table
CREATE TABLE Posts (
    Id SERIAL PRIMARY KEY,
    Title VARCHAR(500) NOT NULL,
    Content TEXT NOT NULL,
    AuthorId INTEGER NOT NULL,
    AuthorName VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Likes INTEGER NOT NULL DEFAULT 0,
    
    -- Foreign key constraint
    CONSTRAINT FK_Posts_AuthorId 
        FOREIGN KEY (AuthorId) 
        REFERENCES Users(Id) 
        ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IX_Posts_AuthorId ON Posts(AuthorId);
CREATE INDEX IX_Posts_CreatedAt ON Posts(CreatedAt DESC);
CREATE INDEX IX_Users_Email ON Users(Email);

-- Grant permissions (adjust as needed for your database user)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO your_app_user;