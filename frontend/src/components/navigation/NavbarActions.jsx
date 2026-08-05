
import NotificationButton from "./NotificationButton";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "./UserMenu";
import MobileNav from "./MobileNav";

export default function NavbarActions() {
  return (
    <div className="flex items-center gap-2">
      

      <NotificationButton />

      <ThemeToggle />

      <UserMenu />

      <MobileNav />
    </div>
  );
}