import NotificationButton from "./NotificationButton";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "./UserMenu";
import MobileNav from "./MobileNav";

export default function NavbarActions() {
  return (
    <div className="flex items-center justify-end gap-1 sm:gap-2">
      <div className="shrink-0">
        <NotificationButton />
      </div>

      <div className="shrink-0">
        <ThemeToggle />
      </div>

      <div className="shrink-0">
        <UserMenu />
      </div>

      <div className="shrink-0">
        <MobileNav />
      </div>
    </div>
  );
}
