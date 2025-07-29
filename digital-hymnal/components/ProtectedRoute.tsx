import React from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, login } = useAuth();

  React.useEffect(() => {
    // Netlify identity widget is not available during SSR or initial load sometimes.
    // Check for its existence before trying to use it.
    if (typeof window !== 'undefined' && (window as any).netlifyIdentity) {
      if (!isLoggedIn) {
        login();
      }
    }
  }, [isLoggedIn, login]);

  if (!isLoggedIn) {
    return (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">Redirecting to Login...</h2>
            <p className="text-lg text-gray-600 mt-2">Please log in to access your portal.</p>
        </div>
    );
  }

  return children;
};

export default ProtectedRoute;
