import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/auth";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();

  useEffect(() => {
    async function finishLogin() {
      const user = await refetchUser();

      if (user) {
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }

    finishLogin();
  }, [navigate, refetchUser]);

  return <p>Signing you in...</p>;
}