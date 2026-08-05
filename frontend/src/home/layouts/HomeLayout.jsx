import Container from "@/components/layout/Container";

import Sidebar from "../components/Sidebar";
import FeedSection from "../sections/FeedSection";
import CampusPulseSection from "../sections/CampusPulseSection";

export default function HomeLayout() {
  return (
    <Container size="xl" className="py-8">
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-2 sticky top-24 self-start">
          <Sidebar />
        </aside>

        {/* Feed */}
        <main className="col-span-12 lg:col-span-8">
          <FeedSection />
        </main>

        {/* Campus Pulse */}
        <aside className="hidden xl:block xl:col-span-2 sticky top-24 self-start">
          <CampusPulseSection />
        </aside>
      </div>
    </Container>
  );
}