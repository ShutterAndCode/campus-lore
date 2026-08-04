import { FileQuestion } from "lucide-react";

import StatusPage from "@/components/feedback/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      icon={FileQuestion}
      title="Page Not Found"
      description="The page you're looking for doesn't exist or may have been moved."
      secondaryDescription="Check the URL or return to the dashboard to continue exploring CampusLore."
      primaryAction={{
        label: "Back to Home",
        to: "/",
      }}
    />
  );
}