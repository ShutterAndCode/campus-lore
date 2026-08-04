import { ShieldAlert } from "lucide-react";

import StatusPage from "@/components/feedback/StatusPage";

export default function Unauthorized() {
  return (
    <StatusPage
      icon={ShieldAlert}
      title="Access Denied"
      description="You don't have permission to access this page."
      secondaryDescription="Please sign in with the correct university account or contact an administrator if you believe this is a mistake."
      primaryAction={{
        label: "Sign In",
        to: "/login",
      }}
      secondaryAction={{
        label: "Go Home",
        to: "/",
      }}
    />
  );
}