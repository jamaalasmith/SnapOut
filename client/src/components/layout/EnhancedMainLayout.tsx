import { useState } from 'react';
import { Layout, Button, Space, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { SearchBar } from '../ui/SearchBar';
import { NotificationCenter } from '../ui/NotificationCenter';
import { UserProfileDropdown } from '../ui/UserProfileDropdown';
import { QuickActions } from '../ui/QuickActions';
import { useUiStore } from '../../stores/uiStore';

const { Header, Content, Sider } = Layout;

export const EnhancedMainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme: appTheme } = useUiStore();
  const { token } = theme.useToken();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Layout className="min-h-screen">
      {/* Top Header */}
      <Header 
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm"
        style={{ 
          padding: '0 24px',
          height: '64px',
          lineHeight: '64px'
        }}
      >
        <div className="flex items-center justify-between h-full">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleSidebar}
              className="lg:hidden"
            />
            
            {/* Logo - visible on mobile when sidebar is collapsed */}
            <div className={`font-bold text-xl text-gray-800 ${sidebarCollapsed ? 'block' : 'hidden lg:hidden'}`}>
              SnapOut
            </div>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <SearchBar />
          </div>

          {/* Right section */}
          <Space size="middle">
            <QuickActions />
            <NotificationCenter />
            <UserProfileDropdown />
          </Space>
        </div>
      </Header>

      <Layout className="pt-16"> {/* Account for fixed header */}
        {/* Sidebar */}
        <Sider
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
          collapsible
          trigger={null}
          width={280}
          collapsedWidth={80}
          className="fixed left-0 top-16 bottom-0 z-40 transition-all duration-200 shadow-lg lg:shadow-none"
          style={{
            background: token.colorBgContainer,
          }}
          breakpoint="lg"
          onBreakpoint={(broken) => {
            if (broken) {
              setSidebarCollapsed(true);
            }
          }}
        >
          <Sidebar collapsed={sidebarCollapsed} />
        </Sider>

        {/* Main Content */}
        <Layout 
          className="transition-all duration-200"
          style={{ 
            marginLeft: sidebarCollapsed ? 80 : 280,
          }}
        >
          <Content 
            className="p-6 bg-gray-50 min-h-screen"
            style={{
              marginLeft: 0, // Reset for responsive
            }}
          >
            {/* Mobile Search Bar */}
            <div className="md:hidden mb-6">
              <SearchBar />
            </div>

            {/* Page Content */}
            <div className="max-w-4xl mx-auto">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* Mobile Sidebar Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </Layout>
  );
};