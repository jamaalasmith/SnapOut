import { useState } from 'react';
import { Row, Col, Card, Typography, Avatar, Button, Input, Space, Divider, Tag, Spin, Empty, Alert } from 'antd';
import { 
  PlusOutlined, 
  UserOutlined, 
  TrophyOutlined,
  FireOutlined,
  HeartOutlined,
  MessageOutlined,
  CameraOutlined,
  BookOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PostCard } from '../components/ui/PostCard';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants';
import { Post } from '../types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// Mock data for suggestions and stats
const suggestedUsers = [
  { id: '1', name: 'John Smith', avatar: '', followers: '1.2k', mutual: 3 },
  { id: '2', name: 'Emma Wilson', avatar: '', followers: '856', mutual: 7 },
  { id: '3', name: 'Mike Chen', avatar: '', followers: '2.1k', mutual: 2 },
];

const trendingTopics = [
  { tag: 'Technology', posts: 1250 },
  { tag: 'Travel', posts: 890 },
  { tag: 'Photography', posts: 654 },
  { tag: 'Fitness', posts: 432 },
];

export const HomePage = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const { data: posts, isLoading, error, isError } = usePosts(page);
  const [quickPostText, setQuickPostText] = useState('');

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
      <Row gutter={[24, 24]}>
        {/* Left Sidebar - User Info & Quick Actions */}
        <Col xs={0} lg={6}>
          <div className="space-y-4 sticky top-4">
            {/* User Quick Info */}
            <Card className="text-center">
              <Avatar 
                size={80} 
                src={user?.avatarUrl}
                icon={<UserOutlined />}
                className="mb-4"
              >
                {!user?.avatarUrl && (
                  (user?.firstName?.charAt(0) || '') + (user?.lastName?.charAt(0) || '')
                )}
              </Avatar>
              <Title level={4} className="mb-2">{user?.fullName}</Title>
              <Text type="secondary">@{user?.email?.split('@')[0]}</Text>
              
              <Divider />
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-blue-600">12</div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">156</div>
                  <div className="text-xs text-gray-500">Following</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-600">89</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
              </div>
              
              <Button 
                type="primary" 
                icon={<UserOutlined />} 
                className="mt-4 w-full"
                onClick={() => window.location.href = ROUTES.PROFILE}
              >
                View Profile
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card title={<span><TrophyOutlined className="mr-2" />This Week</span>} size="small">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Posts Created</span>
                  <Tag color="blue">3</Tag>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Likes Received</span>
                  <Tag color="red">47</Tag>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Comments</span>
                  <Tag color="green">12</Tag>
                </div>
              </div>
            </Card>
          </div>
        </Col>

        {/* Main Content - Feed */}
        <Col xs={24} lg={12}>
          <div className="space-y-6">
            {/* Welcome Banner */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <Title level={3} className="text-white mb-2">
                    Welcome back, {user?.firstName}! 👋
                  </Title>
                  <Text className="text-blue-100">
                    Ready to share something amazing with the world?
                  </Text>
                </div>
                <Button 
                  type="primary" 
                  ghost 
                  icon={<PlusOutlined />}
                  size="large"
                  onClick={() => window.location.href = ROUTES.CREATE_POST}
                >
                  Create Post
                </Button>
              </div>
            </Card>

            {/* Quick Post Composer */}
            <Card>
              <div className="flex items-start space-x-3">
                <Avatar 
                  src={user?.avatarUrl}
                  icon={<UserOutlined />}
                >
                  {!user?.avatarUrl && (
                    (user?.firstName?.charAt(0) || '') + (user?.lastName?.charAt(0) || '')
                  )}
                </Avatar>
                <div className="flex-1">
                  <TextArea
                    placeholder={`What's on your mind, ${user?.firstName}?`}
                    value={quickPostText}
                    onChange={(e) => setQuickPostText(e.target.value)}
                    rows={3}
                    className="border-0 resize-none"
                    style={{ boxShadow: 'none' }}
                  />
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <Space>
                      <Button icon={<CameraOutlined />} type="text">Photo</Button>
                      <Button type="text">GIF</Button>
                      <Button type="text">Poll</Button>
                    </Space>
                    <Button 
                      type="primary" 
                      disabled={!quickPostText.trim()}
                      onClick={() => {
                        // TODO: Handle quick post creation
                        setQuickPostText('');
                      }}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Feed Content */}
            <div className="space-y-4">
              {isLoading && page === 1 ? (
                <div className="flex justify-center items-center h-64">
                  <Spin size="large" />
                </div>
              ) : isError ? (
                <Alert
                  message="Error"
                  description="Failed to load posts. Please try again."
                  type="error"
                  showIcon
                />
              ) : !posts || posts.length === 0 ? (
                <Card>
                  <Empty
                    description="No posts in your feed yet"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  >
                    <Button type="primary" onClick={() => window.location.href = ROUTES.EXPLORE}>
                      Discover People to Follow
                    </Button>
                  </Empty>
                </Card>
              ) : (
                <>
                  {posts.map((post: Post) => (
                    <PostCard 
                      key={post.id} 
                      post={post}
                    />
                  ))}
                  
                  {posts.length >= 10 && (
                    <div className="text-center mt-8">
                      <Button 
                        type="primary" 
                        onClick={handleLoadMore}
                        loading={isLoading}
                        size="large"
                      >
                        Load More Posts
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Col>

        {/* Right Sidebar - Trending & Suggestions */}
        <Col xs={0} lg={6}>
          <div className="space-y-4 sticky top-4">
            {/* Trending Topics */}
            <Card 
              title={<span><FireOutlined className="mr-2" />Trending Now</span>}
              size="small"
            >
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={topic.tag} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded cursor-pointer">
                    <div>
                      <div className="font-medium">#{topic.tag}</div>
                      <div className="text-xs text-gray-500">{topic.posts} posts</div>
                    </div>
                    <div className="text-xs text-gray-400">#{index + 1}</div>
                  </div>
                ))}
              </div>
              <Divider />
              <Link to={ROUTES.EXPLORE}>
                <Button type="link" className="p-0">
                  Show more trends
                </Button>
              </Link>
            </Card>

            {/* Suggested Users */}
            <Card 
              title={<span><UserOutlined className="mr-2" />People to Follow</span>}
              size="small"
            >
              <div className="space-y-3">
                {suggestedUsers.map((suggUser) => (
                  <div key={suggUser.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar size="small" icon={<UserOutlined />}>
                        {suggUser.name.charAt(0)}
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{suggUser.name}</div>
                        <div className="text-xs text-gray-500">
                          {suggUser.followers} followers • {suggUser.mutual} mutual
                        </div>
                      </div>
                    </div>
                    <Button size="small" type="primary">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
              <Divider />
              <Link to={ROUTES.EXPLORE}>
                <Button type="link" className="p-0">
                  See all suggestions
                </Button>
              </Link>
            </Card>

            {/* Quick Actions */}
            <Card title="Quick Actions" size="small">
              <div className="space-y-2">
                <Button 
                  type="text" 
                  icon={<HeartOutlined />} 
                  className="w-full justify-start"
                >
                  Liked Posts
                </Button>
                <Button 
                  type="text" 
                  icon={<MessageOutlined />} 
                  className="w-full justify-start"
                >
                  My Comments
                </Button>
                <Button 
                  type="text" 
                  icon={<UserOutlined />} 
                  className="w-full justify-start"
                >
                  Following
                </Button>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      </div>
    </div>
  );
};