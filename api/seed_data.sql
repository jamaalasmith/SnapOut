-- SnapOut Database Seed Data
-- Insert sample data matching the mock data from services

-- Insert Users (matching the current mock data)
INSERT INTO Users (Id, Name, Email, CreatedAt) VALUES
(1, 'Jamaal Smith', 'jamaal@example.com', NOW() - INTERVAL '30 days'),
(2, 'Sarah Wilson', 'sarah@example.com', NOW() - INTERVAL '15 days'),
(3, 'Mike Chen', 'mike@example.com', NOW() - INTERVAL '7 days');

-- Reset the Users sequence to continue from the next available ID
SELECT setval('users_id_seq', (SELECT MAX(Id) FROM Users));

-- Insert Posts (matching the current mock data)
INSERT INTO Posts (Id, Title, Content, AuthorId, AuthorName, CreatedAt, Likes) VALUES
(1, 'Welcome to SnapOut!', 'This is our first post on the new platform.', 1, 'Jamaal Smith', NOW() - INTERVAL '2 hours', 5),
(2, 'Building the future', 'Excited to be working on this amazing project.', 2, 'Sarah Wilson', NOW() - INTERVAL '1 hour', 3),
(3, 'Great progress today', 'The API is coming together nicely!', 3, 'Mike Chen', NOW() - INTERVAL '30 minutes', 8);

-- Reset the Posts sequence to continue from the next available ID
SELECT setval('posts_id_seq', (SELECT MAX(Id) FROM Posts));

-- Verify the data was inserted correctly
SELECT 'Users Table:' as table_name;
SELECT * FROM Users ORDER BY Id;

SELECT 'Posts Table:' as table_name;
SELECT * FROM Posts ORDER BY CreatedAt DESC;