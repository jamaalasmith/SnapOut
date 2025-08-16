import { useState } from 'react';
import { Layout as AntLayout, Button, Menu } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  SunOutlined,
  MoonOutlined
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useThemeStore } from '../stores/theme';

const { Header, Sider, Content } = AntLayout;

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: 'Settings',
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
          <h3 style={{ margin: 0 }}>
            {collapsed ? 'S' : 'SnapOut'}
          </h3>
        </div>
        
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
          style={{ border: 'none' }}
        />
      </Sider>
      
      <AntLayout>
        <Header style={{ 
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme === 'light' ? '#ffffff' : undefined,
          borderBottom: theme === 'light' ? '1px solid #e2e8f0' : undefined,
        }}>
          <h2 style={{ margin: 0 }}>Dashboard</h2>
          <Button
            type="text"
            icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          />
        </Header>
        
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24, 
          borderRadius: '8px'
        }}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};