import { NavLink } from "react-router-dom";

export default function NavItem({ label, path,onClick, className = "" }) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors px-3 py-2 rounded-md ${
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        } ${className}`
      }
    >
      {label}
    </NavLink>
  );
}