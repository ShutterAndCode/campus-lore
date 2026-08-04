import { Navigate, Outlet } from "react-router-dom";

import FullPageLoader from "@/components/feedback/FullPageLoader";
import { useAuth } from "@/hooks/useAuth";

export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <FullPageLoader message="Checking authentication..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
