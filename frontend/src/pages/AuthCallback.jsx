import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/apiConstants";
import Page from "@/components/layout/Page";
import Center from "@/components/layout/Center";
import Spinner from "@/components/feedback/Spinner";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;

    api
      .get(API_ENDPOINTS.AUTH.ME)
      .then(() => {
        if (isMounted) navigate("/", { replace: true });
      })
      .catch(() => {
        if (isMounted) {
          setStatus("failed");
          navigate("/login", { replace: true });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <Page>
      <Center className="min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-3">
          <Spinner size={28} />
          <p className="text-sm text-muted-foreground">
            {status === "failed" ? "Sign-in failed. Redirecting..." : "Signing you in..."}
          </p>
        </div>
      </Center>
    </Page>
  );
}