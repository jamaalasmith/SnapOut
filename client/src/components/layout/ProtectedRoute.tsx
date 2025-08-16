import { useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { setAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Auto-login with demo user for development
    if (!isAuthenticated) {
      const demoUser = {
        id: 'demo-123',
        email: 'demo@snapout.com',
        firstName: 'Demo',
        lastName: 'User',
        createdAt: new Date().toISOString(),
        fullName: 'Demo User',
        avatarUrl: undefined,
      };
      setAuth(demoUser, 'demo-token-123');
    }
  }, [isAuthenticated, setAuth]);

  return <>{children}</>;
};