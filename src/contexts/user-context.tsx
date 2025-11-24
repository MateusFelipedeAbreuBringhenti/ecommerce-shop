import { createContext, useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

interface User {
  id: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = supabase.auth.getUser();
    currentUser.then(res => {
      if (res.data.user) {
        setUser({ id: res.data.user.id, email: res.data.user.email ?? "" });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email ?? "" });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function login(user: User) {
    setUser(user);
  }

  function logout() {
    supabase.auth.signOut();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be inside <UserProvider>");
  return context;
}