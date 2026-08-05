import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CreateButton({
  onClick,
}) {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="
        hidden
        rounded-full
        px-5
        lg:inline-flex
      "
    >
      <Plus className="h-4 w-4" />

      Create
    </Button>
  );
}