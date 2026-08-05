import { PenSquare, CircleHelp, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/auth";
import { Button } from "@/components/ui/button";

const ACTIONS = [
  {
    title: "Share Story",
    subtitle: "Help juniors",
    icon: PenSquare,
    href: "/stories/create",
  },
  {
    title: "Ask Question",
    subtitle: "Get guidance",
    icon: CircleHelp,
    href: "/questions/create",
  },
  {
    title: "Discussion",
    subtitle: "Start a conversation",
    icon: MessageSquare,
    href: "/discussions/create",
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <section className="rounded-3xl border bg-card p-8 shadow-sm">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          CampusLore
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          {greeting}
          {user?.name ? `, ${user.name}` : ""} 👋
        </h1>

        <p className="mt-4 text-muted-foreground leading-7">
          Discover experiences shared by seniors, explore campus
          opportunities, and contribute your own journey to help future
          students.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {ACTIONS.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.title}
              variant="outline"
              onClick={() => navigate(action.href)}
              className="h-auto justify-start rounded-2xl p-5"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="text-left">
                  <p className="font-semibold">
                    {action.title}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {action.subtitle}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </section>
  );
}