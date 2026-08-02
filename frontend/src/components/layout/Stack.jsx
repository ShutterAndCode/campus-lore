const gapMap = { 2: "gap-2", 4: "gap-4", 6: "gap-6", 8: "gap-8" };

export default function Stack({
  children,
  direction = "vertical",
  gap = 4,
  className = "",
}) {
  const directionClass = direction === "horizontal" ? "flex-row" : "flex-col";
  return (
    <div className={`flex ${directionClass} ${gapMap[gap] || "gap-4"} ${className}`}>
      {children}
    </div>
  );
}