import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Authorized user credentials
const AUTHORIZED_EMAIL = 'drshafaqatali123@gmail.com';
const AUTHORIZED_USERNAME = 'Dr. Shafaqat Ali';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = sessionStorage.getItem('auth_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.loggedIn && parsed.user) {
          setIsAuthenticated(true);
          setUser(parsed);
        }
      } catch (error) {
        console.error('Error parsing session:', error);
        sessionStorage.removeItem('auth_session');
      }
    }
    setLoading(false);
  }, []);

  const login = (email) => {
    // For email-based auth, we just verify the email is authorized
    // The actual login happens after code verification
    const sessionData = {
      user: AUTHORIZED_USERNAME,
      email: email,
      loggedIn: true,
      loginTime: new Date().toISOString(),
    };
    sessionStorage.setItem('auth_session', JSON.stringify(sessionData));
    setUser(sessionData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('auth_session');
    sessionStorage.removeItem('verification_code');
    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuthorizedEmail = (email) => {
    return email.toLowerCase() === AUTHORIZED_EMAIL.toLowerCase();
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuthorizedEmail,
    authorizedEmail: AUTHORIZED_EMAIL,
    authorizedUsername: AUTHORIZED_USERNAME,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
