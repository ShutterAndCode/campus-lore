import { cn } from "@/lib/utils";

const justifyClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const alignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const directionClasses = {
  row: "flex-row",
  col: "flex-col",
};

export default function Center({
  children,
  className,
  justify = "center",
  align = "center",
  direction = "row",
}) {
  return (
    <div
      className={cn(
        "flex",
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        className
      )}
    >
      {children}
    </div>
  );
}