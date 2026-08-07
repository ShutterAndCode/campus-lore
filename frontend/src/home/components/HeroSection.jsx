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
    <section className="rounded-2xl border bg-card p-5 shadow-sm md:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          CampusLore
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          {greeting}
          {user?.name ? `, ${user.name}` : ""} 👋
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          Discover experiences shared by seniors, explore campus
          opportunities, and contribute your own journey to help future
          students.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-4">
        {ACTIONS.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.title}
              variant="outline"
              onClick={() => navigate(action.href)}
              className="h-auto justify-start rounded-xl p-4 transition-all hover:border-primary hover:bg-primary/5"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="text-left">
                  <p className="font-semibold leading-none">
                    {action.title}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
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