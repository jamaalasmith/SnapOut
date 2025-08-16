import { useState } from 'react';
import { Dropdown, Badge, List, Avatar, Typography, Empty, Button, Spin } from 'antd';
import { BellOutlined, UserOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';

const { Text } = Typography;

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  message: string;
  user: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  read: boolean;
}

// Mock notifications - replace with real data from API
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    message: 'liked your post "My First Post"',
    user: { name: 'Jane Smith', avatar: '' },
    createdAt: '2024-01-15T10:30:00Z',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    message: 'commented on your post',
    user: { name: 'Mike Johnson' },
    createdAt: '2024-01-15T09:15:00Z',
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    message: 'started following you',
    user: { name: 'Sarah Wilson' },
    createdAt: '2024-01-14T16:45:00Z',
    read: true,
  },
];

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isLoading, setIsLoading] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <HeartOutlined style={{ color: '#ff4d4f' }} />;
      case 'comment':
        return <MessageOutlined style={{ color: '#1890ff' }} />;
      case 'follow':
        return <UserOutlined style={{ color: '#52c41a' }} />;
      default:
        return <BellOutlined />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const notificationContent = (
    <div className="w-80 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <Text strong className="text-lg">Notifications</Text>
        {unreadCount > 0 && (
          <Button 
            type="link" 
            size="small" 
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-8">
          <Spin />
        </div>
      ) : notifications.length === 0 ? (
        <div className="p-8">
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No notifications yet"
          />
        </div>
      ) : (
        <List
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item
              className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <List.Item.Meta
                avatar={
                  <div className="relative">
                    <Avatar 
                      src={notification.user.avatar}
                      icon={<UserOutlined />}
                    >
                      {!notification.user.avatar && notification.user.name.charAt(0)}
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                }
                title={
                  <div>
                    <Text strong>{notification.user.name}</Text>
                    <Text> {notification.message}</Text>
                  </div>
                }
                description={
                  <Text type="secondary" className="text-xs">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </Text>
                }
              />
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
              )}
            </List.Item>
          )}
        />
      )}
    </div>
  );

  return (
    <Dropdown
      dropdownRender={() => notificationContent}
      trigger={['click']}
      placement="bottomRight"
    >
      <Badge count={unreadCount} size="small">
        <Button 
          type="text" 
          icon={<BellOutlined />} 
          size="large"
          className="flex items-center justify-center"
        />
      </Badge>
    </Dropdown>
  );
};