import { Skeleton } from "@/components/ui/skeleton";

export default function StorySkeleton() {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <div className="flex gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />

          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <Skeleton className="mt-6 h-8 w-3/4" />

      <Skeleton className="mt-4 h-20 w-full" />

      <Skeleton className="mt-5 h-5 w-48" />
    </div>
  );
}