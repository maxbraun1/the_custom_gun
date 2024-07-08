"use client";
import { usePathname } from "next/navigation";
import AccountMenuLink from "./accountMenuLink";

export default function AccountMenu() {
  const page = usePathname().split("/").slice(-1).pop();
  return (
    <div className="flex flex-col gap-1 p-2">
      <AccountMenuLink
        icon="/assets/icons/dashboard.png"
        link="/account/"
        value="Dashboard"
        active={page === "account"}
      />
      <AccountMenuLink
        icon="/assets/icons/bell.png"
        link="/account/notifications"
        value="Notifications"
        active={page === "notifications"}
      />
      <AccountMenuLink
        icon="/assets/icons/selling-tag.png"
        link="/account/selling"
        value="Selling"
        active={page === "selling"}
      />
      <AccountMenuLink
        icon="/assets/icons/cart.png"
        link="/account/orders"
        value="Orders"
        active={page === "orders"}
      />
      <AccountMenuLink
        icon="/assets/icons/handshake.png"
        link="/account/offers"
        value="Offers"
        active={page === "offers"}
      />
      <AccountMenuLink
        icon="/assets/icons/dollar-black.png"
        link="/account/bids"
        value="Bids"
        active={page === "bids"}
      />
      <AccountMenuLink
        icon="/assets/icons/watch-black.png"
        link="/account/watching"
        value="Watching"
        active={page === "watching"}
      />
      <AccountMenuLink
        icon="/assets/icons/shipping-box.png"
        link="/account/sold-orders"
        value="Sold Orders"
        active={page === "sold-orders"}
      />
      <AccountMenuLink
        icon="/assets/icons/settings.png"
        link="/account/settings"
        value="Settings"
        active={page === "settings"}
      />
    </div>
  );
}
