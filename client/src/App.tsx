import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { Layout } from './components/Layout';
import { Profile } from './components/Profile';
import { useThemeStore } from './stores/theme';
import { useEffect } from 'react';
import { homeService } from './services/homeService';

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const { theme: appTheme } = useThemeStore();

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


  useEffect(() => {
    async function load() {
      try {
        const root = await homeService.root();
        const health = await homeService.health();
        const info = await homeService.info();

        console.log("Home API root:", root);
        console.log("Home API health:", health);
        console.log("Home API info:", info);
      } catch (err) {
        console.error("Failed to call Home API:", err);
      }
    }

    load();
  }, []);


  return (
    <ConfigProvider theme={antdTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <div style={{ padding: '20px' }}>
                <h1>Welcome to SnapOut</h1>
                <p>This is a simple collapsible sidebar layout with beautiful dark mode.</p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px' }}>
                    Primary Button
                  </button>
                  <button style={{ padding: '8px 16px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '8px' }}>
                    Success Button
                  </button>
                  <button style={{ padding: '8px 16px', backgroundColor: '#d97706', color: 'white', border: 'none', borderRadius: '8px' }}>
                    Warning Button
                  </button>
                  <button style={{ padding: '8px 16px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px' }}>
                    Error Button
                  </button>
                </div>
              </div>
            } />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={
              <div style={{ padding: '20px' }}>
                <h1>Settings</h1>
                <p>Settings page coming soon...</p>
              </div>
            } />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;