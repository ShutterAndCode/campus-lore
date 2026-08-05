import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3"
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-primary
          text-primary-foreground
        "
      >
        <GraduationCap className="h-5 w-5" />
      </div>

      <div>
        <h1 className="text-lg font-bold">
          CampusLore
        </h1>

        <p className="text-xs text-muted-foreground">
          Campus Knowledge Hub
        </p>
      </div>
    </Link>
  );
}