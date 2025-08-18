'use client';

import { ConfigProvider, theme } from 'antd';
import { useThemeStore } from '@/stores/theme';
import { Layout } from '@/components/Layout';
import { useEffect } from 'react';

const { defaultAlgorithm, darkAlgorithm } = theme;

export function AntdProvider({ children }: { children: React.ReactNode }) {
  const { theme: appTheme } = useThemeStore();

  useEffect(() => {
    // Set initial theme on page load
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-theme', appTheme);
    }
  }, [appTheme]);

  const antdTheme = {
    algorithm: appTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
    token: {
      // Brand colors - simple and clean
      colorPrimary: '#2563eb', // Clean blue
      colorSuccess: '#059669', // Standard green
      colorWarning: '#d97706', // Standard orange
      colorError: '#dc2626', // Standard red
      
      // Border and surface improvements
      borderRadius: 8,
      borderRadiusLG: 12,
      
      // Dark mode specific improvements
      ...(appTheme === 'dark' && {
        colorBgContainer: '#1f2937', // Darker containers
        colorBgElevated: '#374151', // Elevated surfaces
        colorBgLayout: '#111827', // Page background
        colorBorder: '#374151', // Borders
        colorBorderSecondary: '#4b5563', // Secondary borders
        colorText: '#f9fafb', // Primary text
        colorTextSecondary: '#d1d5db', // Secondary text
        colorTextHeading: '#f9fafb', // Heading text
        colorLink: '#f9fafb', // Link text
        colorLinkHover: '#f9fafb', // Link hover text
        colorLinkActive: '#f9fafb', // Link active text
      }),
      
      // Light mode specific improvements  
      ...(appTheme === 'light' && {
        colorBgContainer: '#ffffff', // Clean white containers
        colorBgElevated: '#ffffff', // White elevated surfaces
        colorBgLayout: '#f8fafc', // Very light background
        colorBorder: '#e2e8f0', // Subtle borders
        colorBorderSecondary: '#cbd5e1', // Secondary borders
        // Specific component overrides for light mode
        colorBgHeader: '#ffffff', // White header
        colorBgSider: '#ffffff', // White sidebar
      }),
    },
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <Layout>
        {children}
      </Layout>
    </ConfigProvider>
  );
}