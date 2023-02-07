import { createContext, useState } from 'react';
import { login, register } from '../api/auth';
import * as jwt from 'jsonwebtoken';
const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  return (
    <AuthProvider
      value={{
        isAuthenticated,
        currentMember: payload,
      }}
    ></AuthProvider>
  );
};

const AuthContext = createContext(defaultAuthContext);
