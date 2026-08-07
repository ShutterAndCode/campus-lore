import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/auth";
import FullPageLoader from "@/components/feedback/FullPageLoader";

export default function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}