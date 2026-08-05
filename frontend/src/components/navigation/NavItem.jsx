import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

export default function NavItem({
  label,
  path,
  icon: Icon,
  className = "",
  onClick,
}) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
          className
        )
      }
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </NavLink>
  );
}