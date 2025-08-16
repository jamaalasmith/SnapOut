import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { Layout } from './components/Layout';
import { useThemeStore } from './stores/theme';

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const { theme: appTheme } = useThemeStore();

  const antdTheme = {
    algorithm: appTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
    token: {
      // Brand colors
      colorPrimary: '#4338ca', // Nice purple-blue
      colorSuccess: '#10b981', // Modern green
      colorWarning: '#f59e0b', // Warm orange
      colorError: '#ef4444', // Clean red
      
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
      <Router>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={
              <div style={{ padding: '20px' }}>
                <h1>Welcome to SnapOut</h1>
                <p>This is a simple collapsible sidebar layout with beautiful dark mode.</p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button style={{ padding: '8px 16px', backgroundColor: '#4338ca', color: 'white', border: 'none', borderRadius: '8px' }}>
                    Primary Button
                  </button>
                  <button style={{ padding: '8px 16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px' }}>
                    Success Button
                  </button>
                  <button style={{ padding: '8px 16px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px' }}>
                    Warning Button
                  </button>
                  <button style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px' }}>
                    Error Button
                  </button>
                </div>
              </div>
            } />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;