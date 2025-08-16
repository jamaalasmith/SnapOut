import { useState } from 'react';
import { Card, Avatar, Button, Typography, Tabs, Spin, Alert } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUsers';
import { useUserPosts } from '../hooks/usePosts';
import { PostCard } from '../components/ui/PostCard';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  
  const { 
    data: profile, 
    isLoading: profileLoading, 
    error: profileError 
  } = useUserProfile(user?.id || '');
  
  const { 
    data: posts, 
    isLoading: postsLoading, 
    error: postsError 
  } = useUserPosts(user?.id || '');

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (profileError) {
    return (
      <Alert
        message="Error"
        description="Failed to load profile. Please try again."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Avatar 
            size={120} 
            src={profile?.avatarUrl}
            icon={<UserOutlined />}
          />
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <Title level={2} className="mb-0">
                {user?.fullName}
              </Title>
              <Button icon={<EditOutlined />} type="default">
                Edit Profile
              </Button>
            </div>
            
            <Text type="secondary" className="text-lg">
              @{user?.email?.split('@')[0]}
            </Text>
            
            {profile?.bio && (
              <Paragraph className="mt-3 mb-4">
                {profile.bio}
              </Paragraph>
            )}
            
            <div className="flex space-x-6 text-center">
              <div>
                <Text strong className="text-lg">{profile?.postsCount || 0}</Text>
                <br />
                <Text type="secondary">Posts</Text>
              </div>
              <div>
                <Text strong className="text-lg">{profile?.followersCount || 0}</Text>
                <br />
                <Text type="secondary">Followers</Text>
              </div>
              <div>
                <Text strong className="text-lg">{profile?.followingCount || 0}</Text>
                <br />
                <Text type="secondary">Following</Text>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Tabs */}
      <Card>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: 'posts',
              label: 'Posts',
              children: (
                <div className="space-y-4">
                  {postsLoading ? (
                    <div className="text-center py-8">
                      <Spin />
                    </div>
                  ) : postsError ? (
                    <Alert
                      message="Failed to load posts"
                      type="error"
                      showIcon
                    />
                  ) : posts && posts.length > 0 ? (
                    posts.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Text type="secondary">No posts yet</Text>
                    </div>
                  )}
                </div>
              ),
            },
            {
              key: 'about',
              label: 'About',
              children: (
                <div className="space-y-4">
                  <div>
                    <Text strong>Email:</Text>
                    <br />
                    <Text>{user?.email}</Text>
                  </div>
                  <div>
                    <Text strong>Member since:</Text>
                    <br />
                    <Text>{new Date(user?.createdAt || '').toLocaleDateString()}</Text>
                  </div>
                  {profile?.location && (
                    <div>
                      <Text strong>Location:</Text>
                      <br />
                      <Text>{profile.location}</Text>
                    </div>
                  )}
                  {profile?.website && (
                    <div>
                      <Text strong>Website:</Text>
                      <br />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer">
                        {profile.website}
                      </a>
                    </div>
                  )}
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};