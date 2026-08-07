import { useUpdateReportStatus } from "../hooks/mutations/useUpdateReportStatus";
import { useResolveReport } from "../hooks/mutations/useResolveReport";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ReportTable({ reports }) {
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateReportStatus();

  const { mutate: resolveReport, isPending: isResolving } =
    useResolveReport();

  const handleStatusUpdate = (reportId, status) => {
    updateStatus({
      reportId,
      status,
    });
  };

  const handleResolve = (reportId) => {
    resolveReport({
      reportId,
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">#</TableHead>

            <TableHead className="w-56">Reporter</TableHead>

            <TableHead className="w-64">Post</TableHead>

            <TableHead className="w-40">Reason</TableHead>

            <TableHead>Description</TableHead>

            <TableHead className="w-36 text-center">
              Status
            </TableHead>

            <TableHead className="w-56 text-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reports?.map((report, index) => (
            <TableRow key={report._id}>
              <TableCell>{index + 1}</TableCell>

              <TableCell>
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={report.reporter?.avatar} />

                    <AvatarFallback>
                      {report.reporter?.name?.charAt(0) ?? "?"}
                    </AvatarFallback>
                  </Avatar>

                  <span className="truncate font-medium">
                    {report.reporter?.name}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div
                  className="truncate font-medium"
                  title={report.post?.title}
                >
                  {report.post?.title || "Post deleted"}
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {report.reason.replaceAll("_", " ")}
                </Badge>
              </TableCell>

              <TableCell>
                <p
                  className="max-w-xs truncate text-muted-foreground"
                  title={report.description}
                >
                  {report.description || "No description"}
                </p>
              </TableCell>

              <TableCell className="text-center">
                <Badge
                  variant={
                    report.status === "pending"
                      ? "secondary"
                      : report.status === "reviewed"
                      ? "default"
                      : report.status === "dismissed"
                      ? "outline"
                      : "destructive"
                  }
                  className="capitalize"
                >
                  {report.status}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  {report.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleStatusUpdate(
                            report._id,
                            "reviewed"
                          )
                        }
                        disabled={isUpdating}
                      >
                        Review
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleStatusUpdate(
                            report._id,
                            "dismissed"
                          )
                        }
                        disabled={isUpdating}
                      >
                        Dismiss
                      </Button>
                    </>
                  )}

                  {report.status === "reviewed" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        handleResolve(report._id)
                      }
                      disabled={isResolving}
                    >
                      Resolve
                    </Button>
                  )}

                  {report.status === "dismissed" && (
                    <span className="text-sm text-muted-foreground">
                      Closed
                    </span>
                  )}

                  {report.status === "resolved" && (
                    <span className="text-sm text-muted-foreground">
                      Completed
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}