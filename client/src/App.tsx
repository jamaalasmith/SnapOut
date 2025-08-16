import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { useAuthStore } from './stores/authStore';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { EnhancedMainLayout } from './components/layout/EnhancedMainLayout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { CreatePostPage } from './pages/CreatePostPage';
import { ProfilePage } from './pages/ProfilePage';
import { ExplorePage } from './pages/ExplorePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ROUTES } from './constants';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const antdTheme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
  },
};

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={antdTheme}>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route 
              path={ROUTES.LOGIN} 
              element={
                isAuthenticated ? 
                  <Navigate to={ROUTES.HOME} replace /> : 
                  <LoginPage />
              } 
            />
            <Route 
              path={ROUTES.REGISTER} 
              element={
                isAuthenticated ? 
                  <Navigate to={ROUTES.HOME} replace /> : 
                  <RegisterPage />
              } 
            />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <EnhancedMainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to={ROUTES.HOME} replace />} />
              <Route path={ROUTES.HOME.slice(1)} element={<HomePage />} />
              <Route path={ROUTES.CREATE_POST.slice(1)} element={<CreatePostPage />} />
              <Route path={ROUTES.PROFILE.slice(1)} element={<ProfilePage />} />
              <Route path={ROUTES.EXPLORE.slice(1)} element={<ExplorePage />} />
              <Route path={ROUTES.NOTIFICATIONS.slice(1)} element={<NotificationsPage />} />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Route>
          </Routes>
        </Router>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;