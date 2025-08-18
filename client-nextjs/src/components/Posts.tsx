'use client';

import { useState, useEffect } from 'react';
import { Card, Spin, Alert, Typography, Space, Avatar } from 'antd';
import { UserOutlined, HeartOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { postService, type Post } from '../services/postService';

const { Title, Text } = Typography;

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await postService.getAllPosts();
        setPosts(response.posts);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: '24px' }}
      />
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>Posts</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            style={{ width: '100%' }}
            actions={[
              <Space key="likes">
                <HeartOutlined />
                <Text>{post.likes} likes</Text>
              </Space>,
              <Space key="time">
                <ClockCircleOutlined />
                <Text>{formatDate(post.createdAt)}</Text>
              </Space>
            ]}
          >
            <Card.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={post.authorName}
              description={
                <div style={{ marginTop: '12px' }}>
                  <Text>{post.content}</Text>
                </div>
              }
            />
          </Card>
        ))}
      </Space>
      
      {posts.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          color: '#666'
        }}>
          <Text>No posts available yet.</Text>
        </div>
      )}
    </div>
  );
};