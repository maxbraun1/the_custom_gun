import Image from "next/image";

export function Spinner({ size }: { size?: number }) {
  return (
    <Image
      src="/assets/ui/spinner.gif"
      width={size || 25}
      height={size || 25}
      alt=""
    />
  );
}
