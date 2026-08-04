import { cn } from "@/lib/utils";

export default function PageHeader({
  title,
  description,
  action,
  level = 1,
  className,
  ...props
}) {
  const Heading = `h${level}`;

  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div>
        <Heading className="text-2xl font-bold text-foreground md:text-3xl">
          {title}
        </Heading>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}