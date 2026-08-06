import { User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ThemeToggle from "@/components/ThemeToggle";
const placeholderUser = {
  name: "Student Name",
  email: "student@university.edu",
  avatarUrl: "",
};
export default function UserMenu() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
    flex
    items-center
    gap-3
    rounded-full
    px-2
    py-1
    hover:bg-muted
    transition-colors
  "
      >
        <Avatar>
          <AvatarImage src={user?.avatar} alt={user?.name} />

          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="hidden xl:block text-left">
          <p className="text-sm font-medium">{user?.name || "Student"}</p>

          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-sm font-medium text-foreground">
              {user?.name ?? "Student"}
            </p>

            <p className="text-xs text-muted-foreground">{user?.email ?? ""}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => navigate("/profile")}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
