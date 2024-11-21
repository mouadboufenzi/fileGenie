import { createContext, useContext, useEffect, useState } from 'react';
import { fetchAPI } from './utils/fetch';
import { GenericMessage } from './types/genericMessage';
import { useSessionStorage } from '@mantine/hooks';

const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
  login: (token: string) => console.log(token),
  logout: () => console.log('logout'),
});

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [isLoading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useSessionStorage({
    key: 'filegenie-token',
    defaultValue: { token: '' },
  });

  useEffect(() => {
    const verifyToken = async () => {
      if (authToken.token) {
        await fetchAPI<GenericMessage>(`/api/auth/verify/${authToken.token}`, 'GET')
          .then((data) => {
            if (data.message !== 'Token OK') {
              setAuthToken({ token: '' });
            }
          });
      }

      setLoading(false);
    };
    
    void verifyToken();
  }, [authToken, setAuthToken]);

  const login = (token: string) => {
    setAuthToken({ token });
  };

  const logout = () => {
    setAuthToken({ token: ''});
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: authToken.token !== '', login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
