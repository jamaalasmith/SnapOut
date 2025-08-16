import { Dropdown, Avatar, Typography, Space, Divider, Badge } from 'antd';
import { 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  BookOutlined,
  HeartOutlined,
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useUiStore } from '../../stores/uiStore';
import { ROUTES } from '../../constants';

const { Text } = Typography;

export const UserProfileDropdown = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useUiStore();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const menuItems = [
    {
      key: 'profile-info',
      label: (
        <div className="px-2 py-3">
          <div className="flex items-center space-x-3">
            <Avatar 
              size={48} 
              src={user?.avatarUrl}
              icon={<UserOutlined />}
            >
              {!user?.avatarUrl && (
                (user?.firstName?.charAt(0) || '') + (user?.lastName?.charAt(0) || '')
              )}
            </Avatar>
            <div>
              <Text strong className="block">{user?.fullName}</Text>
              <Text type="secondary" className="text-sm">
                @{user?.email?.split('@')[0]}
              </Text>
            </div>
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'my-profile',
      icon: <UserOutlined />,
      label: <Link to={ROUTES.PROFILE}>My Profile</Link>,
    },
    {
      key: 'saved-posts',
      icon: <BookOutlined />,
      label: (
        <div className="flex items-center justify-between">
          <span>Saved Posts</span>
          <Badge count={5} size="small" />
        </div>
      ),
    },
    {
      key: 'liked-posts',
      icon: <HeartOutlined />,
      label: 'Liked Posts',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'theme-toggle',
      icon: theme === 'light' ? <MoonOutlined /> : <SunOutlined />,
      label: `${theme === 'light' ? 'Dark' : 'Light'} Mode`,
      onClick: toggleTheme,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Log Out',
      onClick: logout,
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      trigger={['click']}
      overlayClassName="w-64"
    >
      <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
        <Avatar 
          size="default" 
          src={user?.avatarUrl}
          icon={<UserOutlined />}
        >
          {!user?.avatarUrl && (
            (user?.firstName?.charAt(0) || '') + (user?.lastName?.charAt(0) || '')
          )}
        </Avatar>
        <div className="hidden md:block">
          <Text strong className="block text-sm">{user?.fullName}</Text>
          <Text type="secondary" className="text-xs">
            @{user?.email?.split('@')[0]}
          </Text>
        </div>
      </div>
    </Dropdown>
  );
};