import { TriangleAlert } from "lucide-react";

import EmptyState from "./EmptyState";

import { Button } from "@/components/ui/button";

export default function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  retryLabel = "Try Again",
  onRetry,
}) {
  return (
    <EmptyState
      icon={TriangleAlert}
      title={title}
      description={description}
      action={
        onRetry && (
          <Button onClick={onRetry}>
            {retryLabel}
          </Button>
        )
      }
    />
  );
}