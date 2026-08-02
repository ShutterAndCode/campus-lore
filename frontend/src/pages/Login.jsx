import { Button } from "@/components/ui/button";
import { API_ENDPOINTS } from "@/lib/apiConstants";
import Page from "@/components/layout/Page";
import Center from "@/components/layout/Center";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}${API_ENDPOINTS.AUTH.GOOGLE_LOGIN}`;
  };

  return (
    <Page>
      <Center className="min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-sm text-center space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome to CampusLore</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in with your university Google account to continue.
            </p>
          </div>
          <Button onClick={handleGoogleLogin} className="w-full">
            Continue with Google
          </Button>
        </div>
      </Center>
    </Page>
  );
}