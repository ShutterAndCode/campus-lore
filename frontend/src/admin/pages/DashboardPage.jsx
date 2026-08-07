import { Users, FileText, MessageCircle, AlertTriangle } from "lucide-react";

import { useAdminStats } from "../hooks/queries/useAdminStats";
import StatCard from "../components/StatCard";

import  Grid from "@/components/layout/Grid";
import  Page from "@/components/layout/Grid";
import  PageHeader from "@/components/layout/Grid";

export default function DashboardPage() {
  const { data, isLoading, isError } = useAdminStats();

  if (isLoading) {
    return <Page>Loading dashboard...</Page>;
  }

  if (isError) {
    return <Page>Failed to load dashboard.</Page>;
  }

  return (
    <Page>
      <PageHeader
        title="Admin Dashboard"
        description="Overview of platform activity"
      />

      <Grid className="mt-6">
        <StatCard title="Users" value={data.users} icon={Users} />

        <StatCard title="Posts" value={data.posts} icon={FileText} />

        <StatCard title="Comments" value={data.comments} icon={MessageCircle} />

        <StatCard
          title="Pending Reports"
          value={data.pendingReports}
          icon={AlertTriangle}
        />
      </Grid>
    </Page>
  );
}
