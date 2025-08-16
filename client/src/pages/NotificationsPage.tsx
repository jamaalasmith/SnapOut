import { Card, Typography, Tabs, List, Avatar, Button, Empty } from 'antd';
import { UserOutlined, HeartOutlined, MessageOutlined, UserAddOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';

const { Title } = Typography;

const notifications = [
  {
    id: '1',
    type: 'like',
    user: { name: 'Jane Smith', avatar: '', id: '1' },
    content: 'liked your post "Beautiful sunset at the beach"',
    time: '2024-01-15T10:30:00Z',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    user: { name: 'Mike Johnson', avatar: '', id: '2' },
    content: 'commented on your post',
    time: '2024-01-15T09:15:00Z',
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    user: { name: 'Sarah Wilson', avatar: '', id: '3' },
    content: 'started following you',
    time: '2024-01-14T16:45:00Z',
    read: true,
  },
];

export const NotificationsPage = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <HeartOutlined style={{ color: '#ff4d4f' }} />;
      case 'comment':
        return <MessageOutlined style={{ color: '#1890ff' }} />;
      case 'follow':
        return <UserAddOutlined style={{ color: '#52c41a' }} />;
      default:
        return <UserOutlined />;
    }
  };

  const tabItems = [
    {
      key: 'all',
      label: 'All',
      children: (
        <List
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item
              className={`${!notification.read ? 'bg-blue-50' : ''}`}
              actions={[
                <Button type="link" size="small">
                  View
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <div className="relative">
                    <Avatar 
                      src={notification.user.avatar}
                      icon={<UserOutlined />}
                    >
                      {notification.user.name.charAt(0)}
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      {getIcon(notification.type)}
                    </div>
                  </div>
                }
                title={
                  <span>
                    <strong>{notification.user.name}</strong> {notification.content}
                  </span>
                }
                description={formatDistanceToNow(new Date(notification.time), { addSuffix: true })}
              />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'unread',
      label: 'Unread',
      children: (
        <List
          dataSource={notifications.filter(n => !n.read)}
          renderItem={(notification) => (
            <List.Item
              className="bg-blue-50"
              actions={[
                <Button type="link" size="small">
                  Mark as read
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <div className="relative">
                    <Avatar 
                      src={notification.user.avatar}
                      icon={<UserOutlined />}
                    >
                      {notification.user.name.charAt(0)}
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      {getIcon(notification.type)}
                    </div>
                  </div>
                }
                title={
                  <span>
                    <strong>{notification.user.name}</strong> {notification.content}
                  </span>
                }
                description={formatDistanceToNow(new Date(notification.time), { addSuffix: true })}
              />
            </List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Title level={2}>Notifications</Title>
      </div>

      <Card>
        <Tabs
          defaultActiveKey="all"
          items={tabItems}
          tabBarExtraContent={
            <Button type="link">
              Mark all as read
            </Button>
          }
        />
      </Card>
    </div>
  );
};