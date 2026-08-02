import { navigationItems } from "@/config/navigation";
import NavItem from "./NavItem";

export default function NavLinks({ className = "" }) {
  return (
    <nav className={`hidden md:flex items-center gap-1 ${className}`} aria-label="Main navigation">
      {navigationItems.map((item) => (
        <NavItem key={item.path} label={item.label} path={item.path} />
      ))}
    </nav>
  );
}