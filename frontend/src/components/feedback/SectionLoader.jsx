import Spinner from "./Spinner";

export default function SectionLoader({
  label = "Loading...",
  className = "",
}) {
  return (
    <div
      className={`flex min-h-40 items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3">
        <Spinner />

        <p className="text-sm text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
}