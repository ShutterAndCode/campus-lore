import { Outlet } from "react-router-dom";

import Navbar from "@/components/navigation/Navbar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header>
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}