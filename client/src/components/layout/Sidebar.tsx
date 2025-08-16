import { Menu, Badge, Divider } from 'antd';
import { 
  HomeOutlined, 
  CompassOutlined, 
  HeartOutlined,
  BookOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  TrophyOutlined,
  FireOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useAuthStore } from '../../stores/authStore';

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar = ({ collapsed = false }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuthStore();

  const mainMenuItems = [
    {
      key: ROUTES.HOME,
      icon: <HomeOutlined />,
      label: <Link to={ROUTES.HOME}>Home</Link>,
    },
    {
      key: ROUTES.EXPLORE,
      icon: <CompassOutlined />,
      label: <Link to={ROUTES.EXPLORE}>Explore</Link>,
    },
    {
      key: '/trending',
      icon: <FireOutlined />,
      label: (
        <div className="flex items-center justify-between w-full">
          <Link to="/trending">Trending</Link>
          <Badge dot color="red" />
        </div>
      ),
    },
    {
      key: '/notifications',
      icon: <HeartOutlined />,
      label: (
        <div className="flex items-center justify-between w-full">
          <Link to="/notifications">Notifications</Link>
          <Badge count={3} size="small" />
        </div>
      ),
    },
  ];

  const personalMenuItems = [
    {
      key: ROUTES.PROFILE,
      icon: <UserOutlined />,
      label: <Link to={ROUTES.PROFILE}>My Profile</Link>,
    },
    {
      key: '/saved',
      icon: <BookOutlined />,
      label: <Link to="/saved">Saved Posts</Link>,
    },
    {
      key: '/following',
      icon: <UsergroupAddOutlined />,
      label: <Link to="/following">Following</Link>,
    },
    {
      key: '/activity',
      icon: <ClockCircleOutlined />,
      label: <Link to="/activity">My Activity</Link>,
    },
  ];

  const settingsMenuItems = [
    {
      key: '/achievements',
      icon: <TrophyOutlined />,
      label: <Link to="/achievements">Achievements</Link>,
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
    },
  ];

  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="p-4">
        {!collapsed && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800">SnapOut</h3>
            <p className="text-sm text-gray-500">Welcome back, {user?.firstName}!</p>
          </div>
        )}
        
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          className="border-0"
          items={mainMenuItems}
          inlineCollapsed={collapsed}
        />
        
        {!collapsed && (
          <>
            <Divider orientation="left" className="text-xs text-gray-400 mt-6 mb-4">
              Personal
            </Divider>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              className="border-0"
              items={personalMenuItems}
            />
            
            <Divider orientation="left" className="text-xs text-gray-400 mt-6 mb-4">
              More
            </Divider>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              className="border-0"
              items={settingsMenuItems}
            />
          </>
        )}
      </div>
    </div>
  );
};