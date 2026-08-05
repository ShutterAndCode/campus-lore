import { Inbox } from "lucide-react";

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  size = 40,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <Icon
        size={size}
        className="mb-4 text-muted-foreground"
        strokeWidth={1.5}
      />

      <h3 className="mb-1 text-lg font-semibold text-foreground">
        {title}
      </h3>

      {description && (
        <p className="mb-4 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {action}
    </div>
  );
}