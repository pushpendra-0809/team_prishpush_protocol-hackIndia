import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: { identifier: string; password?: string }) => Promise<void>;
  register: (userData: Partial<User> & { password?: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: '1',
  fullName: 'Rajesh Kumar',
  userName: 'rajesh123',
  phoneNumber: '9876543210',
  aadhaarNumber: '1234 5678 9012',
  category: 'General',
  state: 'Maharashtra',
  district: 'Mumbai',
  gender: 'Male',
  occupation: 'Social Worker',
  annualIncome: '₹4,50,000',
  age: '32',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (credentials: { identifier: string; password?: string }) => {
    // Mock login logic
    console.log('Logging in with:', credentials);
    // Auto-detect identifier type is handled in UI
    setUser(MOCK_USER);
    localStorage.setItem('user', JSON.stringify(MOCK_USER));
  };

  const register = async (userData: Partial<User> & { password?: string }) => {
    console.log('Registering with:', userData);
    const newUser = { ...MOCK_USER, ...userData, id: Date.now().toString() };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...userData };
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
