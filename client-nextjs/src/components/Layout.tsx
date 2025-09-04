'use client';

import { useState } from 'react';
import { Layout as AntLayout, Button, Menu, Input, Badge, Dropdown, Avatar } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  SunOutlined,
  MoonOutlined,
  SearchOutlined,
  BellOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useThemeStore } from '../stores/theme';

const { Header, Sider, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/posts',
      icon: <FileTextOutlined />,
      label: 'Posts',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  // Demo notifications data
  const notificationItems = [
    {
      key: '1',
      label: (
        <div style={{ padding: '8px 0' }}>
          <div style={{ fontWeight: '500' }}>New follower</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Sarah liked your profile</div>
          <div style={{ fontSize: '11px', color: '#999' }}>2 minutes ago</div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{ padding: '8px 0' }}>
          <div style={{ fontWeight: '500' }}>Comment on post</div>
          <div style={{ fontSize: '12px', color: '#666' }}>John commented on your photo</div>
          <div style={{ fontSize: '11px', color: '#999' }}>1 hour ago</div>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div style={{ padding: '8px 0' }}>
          <div style={{ fontWeight: '500' }}>Welcome to SnapOut!</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Complete your profile to get started</div>
          <div style={{ fontSize: '11px', color: '#999' }}>1 day ago</div>
        </div>
      ),
    },
  ];

  // Demo user menu data
  const userMenuItems = [
    {
      key: 'profile',
      label: 'View Profile',
      onClick: () => router.push('/profile'),
    },
    {
      key: 'settings',
      label: 'Settings',
      onClick: () => router.push('/settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Sign Out',
      onClick: () => console.log('Sign out clicked'),
    },
  ];

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          position: 'relative',
          backgroundColor: theme === 'light' ? '#ffffff' : undefined,
          borderRight: theme === 'light' ? '1px solid #e2e8f0' : undefined,
        }}
      >
        {/* Collapse Button */}
        <div style={{ 
          position: 'absolute', 
          top: '10px', 
          right: collapsed ? '10px' : '16px', 
          zIndex: 10 
        }}>
          <Button
            type="text"
            size="small"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </div>

        <div style={{ 
          padding: '16px', 
          textAlign: 'center',
          marginTop: '32px' // Space for collapse button
        }}>
     
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ border: 'none' }}
        />
      </Sider>
      
      <AntLayout>
        <Header style={{ 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          backgroundColor: theme === 'light' ? '#ffffff' : undefined,
          borderBottom: theme === 'light' ? '1px solid #e2e8f0' : undefined,
        }}>
          {/* Left - App Branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 'fit-content' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              backgroundColor: '#2563eb', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px'
            }}>
              S
            </div>
            <h2 className="header-logo-text" style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>SnapOut</h2>
          </div>

          {/* Center - Search Bar */}
          <div className="header-search" style={{ flex: 1, maxWidth: '400px', margin: '0 auto' }}>
            <Input
              placeholder="Search users, posts..."
              prefix={<SearchOutlined style={{ color: '#666' }} />}
              style={{ 
                borderRadius: '20px',
                height: '36px'
              }}
            />
          </div>

          {/* Right - User Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 'fit-content' }}>
            {/* Notifications */}
            <Dropdown
              menu={{ items: notificationItems }}
              placement="bottomRight"
              trigger={['click']}
              overlayStyle={{ width: '300px' }}
            >
              <Button
                type="text"
                icon={
                  <Badge count={3} size="small">
                    <BellOutlined />
                  </Badge>
                }
                title="Notifications"
              />
            </Dropdown>

            {/* User Avatar */}
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button
                type="text"
                style={{ 
                  padding: '4px 8px',
                  height: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="header-user-name" style={{ fontSize: '14px' }}>Jamaal Smith</span>
              </Button>
            </Dropdown>

            {/* Theme Toggle */}
            <Button
              type="text"
              icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            />
          </div>
        </Header>
        
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24, 
          borderRadius: '8px'
        }}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};