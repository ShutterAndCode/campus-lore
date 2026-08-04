import Center from "@/components/layout/Center";
import Spinner from "@/components/feedback/Spinner";

export default function FullPageLoader({
  size = 28,
  className = "min-h-[calc(100vh-4rem)]",
  message,
}) {
  return (
    <Center
      className={className}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3">
        <Spinner size={size} />

        {message && (
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        )}
      </div>
    </Center>
  );
}