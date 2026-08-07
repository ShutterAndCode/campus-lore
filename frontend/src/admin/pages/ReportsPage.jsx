import { useReports } from "../hooks/queries/useReports";
import ReportTable from "../components/ReportTable";

export default function ReportsPage() {
  const { data, isLoading, isError } = useReports();

  if (isLoading) {
    return <div>Loading reports...</div>;
  }

  if (isError) {
    return <div>Failed to load reports.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>

        <p className="text-muted-foreground">
          Review and moderate reported posts.
        </p>
      </div>

      <ReportTable reports={data} />
    </div>
  );
}
