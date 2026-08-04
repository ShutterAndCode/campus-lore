import { useEffect, useState } from "react";
import api, { setAuthToken } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/apiConstants";
import Page from "@/components/layout/Page";
import Center from "@/components/layout/Center";
import Spinner from "@/components/feedback/Spinner";

const ACCESS_TOKEN_KEY = "accessToken";

export default function AuthCallback() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;
    const hash = window.location.hash.replace(/^#/, "");
    const params = new URLSearchParams(hash);
    const accessToken = params.get("accessToken");

    if (!accessToken) {
      setStatus("failed");
      window.location.replace("/login");
      return;
    }

    setAuthToken(accessToken);
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

    api
      .get(API_ENDPOINTS.AUTH.ME)
      .then(() => {
        if (isMounted) {
          window.location.replace("/");
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus("failed");
          setAuthToken(null);
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          window.location.replace("/login");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

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