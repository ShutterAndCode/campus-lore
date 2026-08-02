import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`text-lg font-bold text-foreground hover:opacity-80 transition-opacity ${className}`}
    >
      CampusLore
    </Link>
  );
}