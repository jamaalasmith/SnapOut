import { useState } from 'react';
import { Spin, Empty, Button, Alert } from 'antd';
import { PostCard } from '../components/ui/PostCard';
import { usePosts } from '../hooks/usePosts';
import { Post } from '../types';

export const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data: posts, isLoading, error, isError } = usePosts(page);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Error"
        description="Failed to load posts. Please try again."
        type="error"
        showIcon
      />
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Empty
        description="No posts yet"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to SnapOut</h1>
        <p className="text-gray-600">Discover amazing posts from our community</p>
      </div>

      <div className="space-y-4">
        {posts.map((post: Post) => (
          <PostCard 
            key={post.id} 
            post={post}
          />
        ))}
      </div>

      {posts.length >= 10 && (
        <div className="text-center mt-8">
          <Button 
            type="primary" 
            onClick={handleLoadMore}
            loading={isLoading}
          >
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
};