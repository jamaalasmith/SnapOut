-- Simple SnapOut Database Setup
-- Tables and sample data only

-- ================================
-- 1. DROP EXISTING TABLES
-- ================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Users;

-- ================================
-- 2. CREATE TABLES
-- ================================

-- Create Users table
CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    PasswordConfirm VARCHAR(255),
    Summary TEXT,
    Avatar VARCHAR(500),
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Posts table (keeping original structure for now)
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

-- ================================
-- 3. CREATE INDEXES
-- ================================

CREATE INDEX IX_Posts_AuthorId ON Posts(AuthorId);
CREATE INDEX IX_Posts_CreatedAt ON Posts(CreatedAt DESC);
CREATE INDEX IX_Users_Email ON Users(Email);

-- ================================
-- 4. INSERT SAMPLE DATA
-- ================================

INSERT INTO Users (FirstName, LastName, Email, Password, PasswordConfirm, Summary, Avatar) VALUES
('Jamaal', 'Smith', 'jamaal@example.com', 'hashed_password_1', 'hashed_password_1', 'Full-stack developer passionate about building great software', 'https://example.com/avatars/jamaal.jpg'),
('Sarah', 'Wilson', 'sarah@example.com', 'hashed_password_2', 'hashed_password_2', 'UX designer with a focus on user-centered design', 'https://example.com/avatars/sarah.jpg'),
('Mike', 'Chen', 'mike@example.com', 'hashed_password_3', 'hashed_password_3', 'Software engineer specializing in backend development', 'https://example.com/avatars/mike.jpg'),
('Emily', 'Rodriguez', 'emily@example.com', 'hashed_password_4', 'hashed_password_4', 'Product manager with experience in agile methodologies', 'https://example.com/avatars/emily.jpg'),
('David', 'Johnson', 'david@example.com', 'hashed_password_5', 'hashed_password_5', 'DevOps engineer focused on cloud infrastructure', 'https://example.com/avatars/david.jpg');

-- ================================
-- 5. VERIFY SETUP
-- ================================

-- Show table structure and data
SELECT 'Users table data:' as info;
SELECT id, firstname, lastname, email, summary, createdat FROM users ORDER BY id;