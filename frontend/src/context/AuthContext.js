import { createContext, useState, useEffect } from 'react';
import api from '../config/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Login attempt with:', email);
      console.log('API URL being used:', api.defaults.baseURL);
      
      const response = await api.post('/api/users/login', { email, password });
      console.log('Login success:', response.data);
      
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Request failed with status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      console.error('Error config:', error.config);
      
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Server may be down or unreachable.'
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      console.log('Registration attempt:', { name, email });
      console.log('API URL being used:', api.defaults.baseURL);
      
      const response = await api.post('/api/users/signup', { name, email, password });
      console.log('Registration response:', response.data);
      
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Request failed with status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      console.error('Error config:', error.config);
      
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Server may be down or unreachable.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}; 