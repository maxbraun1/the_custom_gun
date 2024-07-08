import BidsCard from "./components/bidsCard";
import NotificationsCard from "./components/notificationsCard";
import WatchesCard from "./components/watchingCard";

export default async function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="font-display text-3xl mb-5">Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <NotificationsCard className="basis-1/2 flex flex-col justify-between" />
        <WatchesCard className="basis-1/2 flex flex-col justify-between" />
        <BidsCard className="basis-1/2 flex flex-col justify-between" />
      </div>
    </div>
  );
}
