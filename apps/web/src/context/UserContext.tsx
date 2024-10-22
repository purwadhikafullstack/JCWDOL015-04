'use client';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole } from '../types/User'; // Import your user and role types

// Define the shape of the context
interface UserContextType {
  user: User | null;
  role: UserRole;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

// Create the context with a default value
export const UserContext = createContext<UserContextType>({
  user: null,
  role: UserRole.Normal,
  setUser: () => {},
  setRole: () => {},
  logout: () => {},
});

// Define props for the provider
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component that wraps around the app and provides context
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // State for user info
  const [role, setRole] = useState<UserRole>(UserRole.Normal); // State for user role

  // Optional: Implement persistence using localStorage or sessionStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role') as UserRole;
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    }
  }, [user, role]);

  // Logout function
  const logout = () => {
    setUser(null);
    setRole(UserRole.Normal);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  return (
    <UserContext.Provider value={{ user, role, setUser, setRole, logout }}>
      {children}
    </UserContext.Provider>
  );
};
