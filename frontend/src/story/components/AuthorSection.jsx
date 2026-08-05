import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AuthorSection({
  author,
  year,
  branch,
}) {
  return (
    <section className="flex items-center gap-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={author.avatar} alt={author.name} />

        <AvatarFallback>
          {author.name.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div>
        <h3 className="font-semibold">
          {author.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          {year} • {branch}
        </p>
      </div>
    </section>
  );
}