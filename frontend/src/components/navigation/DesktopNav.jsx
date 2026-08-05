import NavItem from "./NavItem";
import { navigationItems } from "./navigation";

export default function DesktopNav() {
  return (
    <nav
      className="hidden lg:flex items-center gap-1"
      aria-label="Primary navigation"
    >
      {navigationItems
        .filter((item) => item.showInNavbar)
        .map((item) => (
          <NavItem
            key={item.path}
            {...item}
          />
        ))}
    </nav>
  );
}