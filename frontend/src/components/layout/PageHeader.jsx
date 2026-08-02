export default function PageHeader({ title, description, action, className = "" }) {
  return (
    <div className={`flex items-center justify-between gap-4 mb-8 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}