import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { ROUTES } from '../../constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};