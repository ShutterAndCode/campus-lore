import NavbarContainer from "@/components/layout/NavbarContainer";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavbarActions from "./NavbarActions";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <NavbarContainer>
        {/* Mobile: Logo + Actions | Desktop: Logo + Search + Actions */}
        <div className="flex items-center justify-between py-3 xl:grid xl:grid-cols-[auto_1fr_auto] xl:items-center xl:gap-4">
          {/* Logo */}
          <div className="min-w-0">
            <Logo />
          </div>

          {/* Search (Desktop Only) */}
          <div className="hidden xl:flex justify-center w-full">
            <SearchBar className="w-full max-w-xl" />
          </div>

          {/* Right Actions */}
          <div className="flex items-center justify-end">
            <NavbarActions />
          </div>
        </div>
      </NavbarContainer>
    </header>
  );
}