import { cn } from "@/lib/utils";

const directionMap = {
  vertical: "flex-col",
  horizontal: "flex-row",
};

const gapMap = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

export default function Stack({
  children,
  direction = "vertical",
  gap = 4,
  align,
  justify,
  className,
}) {
  return (
    <div
      className={cn(
        "flex",
        directionMap[direction],
        gapMap[gap] ?? gapMap[4],
        align && alignMap[align],
        justify && justifyMap[justify],
        className
      )}
    >
      {children}
    </div>
  );
}