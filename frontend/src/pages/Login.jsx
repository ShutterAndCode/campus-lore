import { useState } from "react";

import { loginWithGoogle } from "@/auth";

import Center from "@/components/layout/Center";
import Page from "@/components/layout/Page";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [isRedirecting, setIsRedirecting] = useState(false);

const handleLogin = () => {
  window.location.href =
    `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
};

  return (
    <Page>
      <Center className="min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Welcome to CampusLore
            </h1>

            <p className="text-sm text-muted-foreground">
              Sign in with your university Google account to continue.
            </p>
          </div>

          <Button
            type="button"
            className="w-full"
            onClick={handleLogin}
            disabled={isRedirecting}
          >
            {isRedirecting
              ? "Redirecting..."
              : "Continue with Google"}
          </Button>
        </div>
      </Center>
    </Page>
  );
}