import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function loading() {
  return (
    <div className="flex items-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}
