import { Card, Avatar, Button, Divider, Tag, Row, Col } from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  MailOutlined, 
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined
} from '@ant-design/icons';

const { Meta } = Card;

export const Profile = () => {
  const demoUser = {
    name: 'Alex Johnson',
    username: '@alexjohnson',
    email: 'alex.johnson@email.com',
    bio: 'Full-stack developer passionate about creating amazing user experiences. Love coffee, code, and good design.',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    joinDate: 'March 2022',
    followers: 1247,
    following: 342,
    posts: 89,
    avatar: null
  };

  const stats = [
    { label: 'Posts', value: demoUser.posts },
    { label: 'Followers', value: demoUser.followers },
    { label: 'Following', value: demoUser.following },
  ];

  const interests = ['React', 'TypeScript', 'Node.js', 'Design', 'Coffee', 'Travel'];

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      {/* Profile Header */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '20px' }}>
          <Avatar 
            size={120} 
            icon={<UserOutlined />}
            style={{ minWidth: '120px' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '28px' }}>{demoUser.name}</h1>
              <Button type="primary" icon={<EditOutlined />}>
                Edit Profile
              </Button>
            </div>
            <p style={{ color: '#666', margin: '0 0 12px 0', fontSize: '16px' }}>
              {demoUser.username}
            </p>
            <p style={{ margin: '0 0 16px 0', lineHeight: '1.5' }}>
              {demoUser.bio}
            </p>
            
            {/* User Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MailOutlined style={{ color: '#666' }} />
                <span>{demoUser.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <EnvironmentOutlined style={{ color: '#666' }} />
                <span>{demoUser.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LinkOutlined style={{ color: '#666' }} />
                <a href={`https://${demoUser.website}`} target="_blank" rel="noopener noreferrer">
                  {demoUser.website}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarOutlined style={{ color: '#666' }} />
                <span>Joined {demoUser.joinDate}</span>
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