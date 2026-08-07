import { Link } from "react-router-dom";
import logo from "@/assets/branding/logo.webp";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
    >
      <img
        src={logo}
        alt="CampusLore"
        className="h-9 w-9 object-contain"
      />

      <div className="leading-tight">
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          CampusLore
        </h1>

        <p className="text-xs text-muted-foreground">
          Your Campus Knowledge Hub
        </p>
      </div>
    </Link>
  );
}