import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext.js';
import * as AuthService from '../services/AuthService';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('token')));

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Validasi token ke backend dan ambil data user terbaru
          // const userData = await AuthService.getCurrentUser(); // <-- Buka komen ini jika API backend sudah siap

          // Simulasi jika backend belum siap (ambil dari localStorage sementara)
          const savedUser = JSON.parse(localStorage.getItem('user'));
          setUser(savedUser);
          setIsAuthenticated(true);
        } catch (error) {
          // Jika token kadaluarsa atau tidak valid
          console.error('Sesi telah habis:', error);
          AuthService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false); // Selesai loading
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const data = await AuthService.login(email, password);
    setUser(data.user);
    return data.user;
  };

  const register = (payload) => AuthService.register(payload);

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: Boolean(user), login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}