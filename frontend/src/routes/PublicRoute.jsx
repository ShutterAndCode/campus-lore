import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Center from "@/components/layout/Center";
import Spinner from "@/components/feedback/Spinner";

export default function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center className="min-h-[calc(100vh-4rem)]">
        <Spinner size={28} />
      </Center>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}