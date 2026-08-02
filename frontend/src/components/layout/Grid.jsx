const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};
const gapMap = { 2: "gap-2", 4: "gap-4", 6: "gap-6", 8: "gap-8" };

export default function Grid({ children, cols = 3, gap = 4, className = "" }) {
  return (
    <div className={`grid ${colsMap[cols] || colsMap[3]} ${gapMap[gap] || "gap-4"} ${className}`}>
      {children}
    </div>
  );
}