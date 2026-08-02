import { Outlet } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
}