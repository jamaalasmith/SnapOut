import { Layout, Menu, Button, Avatar, Dropdown, Space, Typography } from 'antd';
import { 
  HomeOutlined, 
  PlusOutlined, 
  UserOutlined, 
  LogoutOutlined,
  SearchOutlined,
  BellOutlined
} from '@ant-design/icons';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

export const MainLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      key: ROUTES.HOME,
      icon: <HomeOutlined />,
      label: <Link to={ROUTES.HOME}>Home</Link>,
    },
    {
      key: ROUTES.EXPLORE,
      icon: <SearchOutlined />,
      label: <Link to={ROUTES.EXPLORE}>Explore</Link>,
    },
    {
      key: ROUTES.CREATE_POST,
      icon: <PlusOutlined />,
      label: <Link to={ROUTES.CREATE_POST}>Create Post</Link>,
    },
    {
      key: ROUTES.PROFILE,
      icon: <UserOutlined />,
      label: <Link to={ROUTES.PROFILE}>Profile</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to={ROUTES.PROFILE}>My Profile</Link>,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between px-6 bg-white shadow-sm border-b">
        <div className="flex items-center">
          <Typography.Title level={3} className="mb-0 mr-8">
            SnapOut
          </Typography.Title>
        </div>
        
        <Space>
          <Button type="text" icon={<BellOutlined />} />
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button type="text" className="flex items-center">
              <Avatar size="small" src={user?.avatarUrl}>
                {!user?.avatarUrl && (
                  (user?.firstName?.charAt(0) || '') + (user?.lastName?.charAt(0) || '')
                )}
              </Avatar>
              <Text className="ml-2 hidden sm:inline">{user?.fullName}</Text>
            </Button>
          </Dropdown>
        </Space>
      </Header>
      
      <Layout>
        <Sider 
          width={250} 
          className="bg-white border-r"
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="border-r-0 h-full"
          />
        </Sider>
        
        <Content className="p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};