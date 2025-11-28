import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/cases/auth/hooks/use-auth";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to={`/signin?redirect=${location.pathname}`} replace />
;
  }

  return <>{children}</>;
}