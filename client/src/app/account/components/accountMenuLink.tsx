import Image from "next/image";
import Link from "next/link";

export default function AccountMenuLink({
  link,
  value,
  icon,
  active,
}: {
  link: string;
  value: string;
  icon: string;
  active: boolean;
}) {
  return (
    <Link
      href={link}
      className={
        "w-full flex justify-start items-center gap-2 p-2.5 rounded-md" +
        (active ? " bg-gray-100" : " hover:bg-gray-100")
      }
    >
      <Image src={icon} width={15} height={15} alt="" />
      <span className="text-sm">{value}</span>
    </Link>
  );
}
