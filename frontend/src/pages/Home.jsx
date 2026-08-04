import { Compass, PenLine, Users } from "lucide-react";

import { useAuth } from "@/auth";

import CampusPulse from "@/components/campus-pulse/CampusPulse";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Page from "@/components/layout/Page";
import ThemeToggle from "@/components/ThemeToggle";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HOME_STATS = [
  { label: "Stories Written", value: 0 },
  { label: "Helpful Marks", value: 0 },
  { label: "Bookmarks", value: 0 },
];

const QUICK_ACTIONS = [
  { label: "Write a Story", icon: PenLine },
  { label: "Explore Campus Topics", icon: Compass },
  { label: "Find a Mentor", icon: Users },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <Page>
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row">
          <main className="min-w-0 flex-1 space-y-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                  Welcome back
                  {user?.name ? `, ${user.name}` : ""}
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Here's what's happening in your journey.
                </p>
              </div>

              <ThemeToggle />
            </div>

            <Grid cols={3} gap={4}>
              {HOME_STATS.map((stat) => (
                <Card key={stat.label}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-2xl font-bold">
                      {stat.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            <Grid cols={3} gap={4}>
              {QUICK_ACTIONS.map(({ label, icon: Icon }) => (
                <Card
                  key={label}
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                >
                  <CardContent className="flex items-center gap-3 pt-6">
                    <Icon className="h-5 w-5 text-primary" />

                    <span className="text-sm font-medium">
                      {label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </main>

          <CampusPulse />
        </div>
      </Container>
    </Page>
  );
}