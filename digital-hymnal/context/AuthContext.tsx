import React, { createContext, useState, useEffect, ReactNode, useContext, useCallback } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

export interface NetlifyUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
  };
}

interface AuthContextType {
  user: NetlifyUser | null;
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<NetlifyUser | null>(null);

  useEffect(() => {
    netlifyIdentity.init();

    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      setUser(currentUser as NetlifyUser);
    }

    const handleLogin = (loggedInUser: netlifyIdentity.User) => {
      setUser(loggedInUser as NetlifyUser);
      netlifyIdentity.close();
    };

    const handleLogout = () => {
      setUser(null);
    };

    netlifyIdentity.on('login', handleLogin);
    netlifyIdentity.on('logout', handleLogout);

    return () => {
      netlifyIdentity.off('login', handleLogin);
      netlifyIdentity.off('logout', logout);
    };
  }, []);

  const login = useCallback(() => {
    netlifyIdentity.open('login');
  }, []);

  const logout = useCallback(() => {
    netlifyIdentity.logout();
  }, []);

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
