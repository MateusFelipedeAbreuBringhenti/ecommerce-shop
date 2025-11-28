import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthResponse, UserResponse } from "../dtos/auth.dto";

interface AuthContextType {
  user: UserResponse | null;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;

  signIn: (data: AuthResponse) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProvideProps = {
  children: ReactNode;
};

export function AuthContextProvide({ children }: AuthContextProvideProps) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const userStoraged = localStorage.getItem('user');
    const tokenStoraged = localStorage.getItem('token');
    

    if (userStoraged) setUser(JSON.parse(userStoraged));
    if (tokenStoraged) setToken(tokenStoraged);
    setLoading(false);
  }, []);

  function signIn(data: AuthResponse) {
    setUser(data.user);
    setToken(data.accessToken);

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.accessToken);
  }

  function signOut() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        signIn,
        signOut,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}