import NavbarContainer from "@/components/layout/NavbarContainer";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavbarActions from "./NavbarActions";

export default function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        bg-background/80
        backdrop-blur-xl
        supports-[backdrop-filter]:bg-background/60
      "
    >
      <NavbarContainer>
        <div
          className="
            grid
            h-[72px]
            grid-cols-[auto_minmax(420px,1fr)_240px]
            items-center
            gap-8
          "
        >
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Search */}
          <div className="flex justify-center">
            <SearchBar className="max-w-2xl" />
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