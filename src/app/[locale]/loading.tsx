import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="section-shell space-y-6 py-12">
      <Skeleton className="h-10 w-56" />
      <Skeleton className="h-32 w-full" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-56 w-full" />
        <Skeleton className="h-56 w-full" />
      </div>
    </div>
  );
}
