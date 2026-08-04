import { Navigate } from "react-router-dom";

import { useAuth } from "@/auth";

export default function PublicRoute({
  children,
}) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}