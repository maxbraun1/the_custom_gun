import Link from "next/link";

interface user {
  first_name: string;
  last_name: string;
  ref: string;
  username: string;
}

export default function UserCard({ user }: { user: user }) {
  return (
    <Link href={"/users/" + user.username}>
      <div className="border border-gray-200 rounded py-2 px-3 mt-2 cursor-pointer hover:bg-gray-100">
        <p className="text-sm font-semibold">
          {user.first_name + " " + user.last_name.charAt(0).toUpperCase() + "."}
        </p>
        <p className="text-sm text-gray-600">{user.username}</p>
      </div>
    </Link>
  );
}
