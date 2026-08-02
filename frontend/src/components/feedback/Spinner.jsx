import { Loader2 } from "lucide-react";

export default function Spinner({ className = "", size = 20 }) {
  return (
    <Loader2
      className={`animate-spin text-muted-foreground ${className}`}
      size={size}
      role="status"
      aria-label="Loading"
    />
  );
}