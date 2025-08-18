import { useState, useEffect } from 'react';
import { Card, Avatar, Button, Divider, Tag, Row, Col, Spin, Alert } from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  MailOutlined, 
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { userService, type User } from '../services/userService';

const { Meta } = Card;

export const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // For demo purposes, fetching user with ID 1
        // In a real app, this would come from authentication context
        const userData = await userService.getUserById(1);
        setUser(userData);
      } catch (err) {
        setError('Failed to load user profile. Please try again later.');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
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

  if (error || !user) {
    return (
      <Alert
        message="Error"
        description={error || 'User not found'}
        type="error"
        showIcon
        style={{ marginBottom: '24px' }}
      />
    );
  }

  const fullName = userService.getFullName(user);
  const username = `@${user.firstName.toLowerCase()}${user.lastName.toLowerCase()}`;
  
  // Demo data for fields not in User model yet
  const demoData = {
    location: 'San Francisco, CA',
    website: 'jamaalsmith.dev',
    followers: 1247,
    following: 342,
    posts: 89
  };

  const stats = [
    { label: 'Posts', value: demoData.posts },
    { label: 'Followers', value: demoData.followers },
    { label: 'Following', value: demoData.following },
  ];

  const interests = ['React', 'TypeScript', 'Node.js', 'Design', 'Coffee', 'Travel'];

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      {/* Profile Header */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '20px' }}>
          <Avatar 
            size={120} 
            src={user.avatar || undefined}
            icon={!user.avatar ? <UserOutlined /> : undefined}
            style={{ minWidth: '120px' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '28px' }}>{fullName}</h1>
              <Button type="primary" icon={<EditOutlined />}>
                Edit Profile
              </Button>
            </div>
            <p style={{ color: '#666', margin: '0 0 12px 0', fontSize: '16px' }}>
              {username}
            </p>
            <p style={{ margin: '0 0 16px 0', lineHeight: '1.5' }}>
              {user.summary || 'No bio available yet.'}
            </p>
            
            {/* User Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MailOutlined style={{ color: '#666' }} />
                <span>{user.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <EnvironmentOutlined style={{ color: '#666' }} />
                <span>{demoData.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LinkOutlined style={{ color: '#666' }} />
                <a href={`https://${demoData.website}`} target="_blank" rel="noopener noreferrer">
                  {demoData.website}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarOutlined style={{ color: '#666' }} />
                <span>Joined {formatJoinDate(user.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <Row gutter={[16, 16]} style={{ textAlign: 'center', marginBottom: '20px' }}>
          {stats.map((stat, index) => (
            <Col span={8} key={index}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
                  {stat.value.toLocaleString()}
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  {stat.label}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Divider />

        {/* Interests */}
        <div>
          <h3 style={{ marginBottom: '12px' }}>Interests</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {interests.map((interest, index) => (
              <Tag key={index} color="blue">
                {interest}
              </Tag>
            ))}
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity" style={{ marginTop: '20px' }}>
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <UserOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
          <p>No recent activity to show</p>
          <Button type="primary">Create Your First Post</Button>
        </div>
      </Card>
    </div>
  );
};