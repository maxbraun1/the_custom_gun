import { cn } from "@/lib/utils";
import Image from "next/image";

export function LoadingSpinner({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn("w-full flex justify-center items-center", className)}>
      <Image
        src="/assets/ui/spinner-blue.gif"
        width={size || 30}
        height={size || 30}
        alt=""
      />
    </div>
  );
}
