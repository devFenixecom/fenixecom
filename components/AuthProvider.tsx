import { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import  React from 'react';

interface User {
  _id: string;
  email: string;
}

interface AuthContext {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContext>({
  user: null,
  loading: true,
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/loginteste');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
