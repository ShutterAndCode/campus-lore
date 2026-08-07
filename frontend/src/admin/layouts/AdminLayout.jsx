import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  ShieldAlert,
} from "lucide-react";

import Page from "@/components/layout/Page";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: Users,
  },
  {
    label: "Posts",
    to: "/admin/posts",
    icon: FileText,
  },
  {
    label: "Reports",
    to: "/admin/reports",
    icon: ShieldAlert,
  },
];

export default function AdminLayout() {
  return (
    <Page>
      <Container size="xl">
        <PageHeader
          title="Admin Dashboard"
          description="Manage users, moderate posts, and review reports."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav className="sticky top-24 space-y-2 rounded-xl border bg-card p-4">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </aside>

          <main className="lg:col-span-9">
            <Outlet />
          </main>
        </div>
      </Container>
    </Page>
  );
}