import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Container from "@/components/layout/Container";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="border-b border-border bg-background">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <NavLinks />
          <div className="flex items-center gap-3">
            <MobileNav />
            <UserMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
