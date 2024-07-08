"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import getUser from "@/lib/util/getUser";
import { useSession } from "@/app/(auth)/useSession";
import { user } from "@/lib/types/user";

export default function HeaderMenu() {
  const [user, setUser] = useState<user | null>(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const user = getUser();
    setUser(user);

    if (user) {
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/notifications/count", {
          withCredentials: true,
        })
        .then((response) => {
          setNotificationCount(response.data);
        })
        .catch((err: AxiosError) => {
          console.log("getNotificationsCount: ", err.message);
          return 0;
        });
    }
  }, []);

  if (!user) {
    return (
      <div className="flex gap-5 items-center">
        <Link className="text-sm shrink-0" href="/login">
          Log In
        </Link>
        {/* <div className="hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none z-50">
              <Image
                src="/assets/icons/menu.png"
                width={30}
                height={30}
                alt=""
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={13} className="w-52 m-2">
              <DropdownMenuItem asChild>
                <Link className="w-full block cursor-pointer" href="/account">
                  <Image
                    className="mr-2"
                    src="/assets/icons/dashboard.png"
                    width={15}
                    height={15}
                    alt=""
                  />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="w-full block cursor-pointer"
                  href="/account/selling"
                >
                  <Image
                    className="mr-2"
                    src="/assets/icons/selling-tag.png"
                    width={15}
                    height={15}
                    alt=""
                  />
                  Selling
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="w-full block cursor-pointer"
                  href="/account/orders"
                >
                  <Image
                    className="mr-2"
                    src="/assets/icons/cart.png"
                    width={15}
                    height={15}
                    alt=""
                  />
                  Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  className="w-full block cursor-pointer relative"
                  href="/account/notifications"
                >
                  <Image
                    className="mr-2"
                    src="/assets/icons/bell.png"
                    width={15}
                    height={15}
                    alt=""
                  />
                  Notifications
                  {notificationCount > 0 && (
                    <div className="bg-red-500 rounded-full w-2 h-2 ml-2"></div>
                  )}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>
    );
  } else {
    return (
      <>
        <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-blue-800 hover:bg-blue-900"
                onClick={logout}
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none z-50">
            <Image src="/assets/icons/menu.png" width={30} height={30} alt="" />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={13} className="w-52 m-2">
            <DropdownMenuItem asChild>
              <Link href="/new-listing">
                <Button className="h-auto w-full bg-blue-950">
                  <Image
                    className="mr-2"
                    src="/assets/icons/create.png"
                    width={15}
                    height={15}
                    alt=""
                  />
                  List an Item
                </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link className="w-full block cursor-pointer" href="/account">
                <Image
                  className="mr-2"
                  src="/assets/icons/dashboard.png"
                  width={15}
                  height={15}
                  alt=""
                />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="w-full block cursor-pointer"
                href="/account/selling"
              >
                <Image
                  className="mr-2"
                  src="/assets/icons/selling-tag.png"
                  width={15}
                  height={15}
                  alt=""
                />
                Selling
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="w-full block cursor-pointer"
                href="/account/orders"
              >
                <Image
                  className="mr-2"
                  src="/assets/icons/cart.png"
                  width={15}
                  height={15}
                  alt=""
                />
                Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                className="w-full block cursor-pointer relative"
                href="/account/notifications"
              >
                <Image
                  className="mr-2"
                  src="/assets/icons/bell.png"
                  width={15}
                  height={15}
                  alt=""
                />
                Notifications
                {notificationCount > 0 && (
                  <div className="bg-red-500 rounded-full w-2 h-2 ml-2"></div>
                )}
              </a>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                className="w-full block cursor-pointer"
                href="/account/settings"
              >
                <Image
                  className="mr-2"
                  src="/assets/icons/settings.png"
                  width={15}
                  height={15}
                  alt=""
                />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setLogoutDialogOpen(true)}
            >
              <Image
                className="mr-2"
                src="/assets/icons/logout.png"
                width={15}
                height={15}
                alt=""
              />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
}

async function logout() {
  let result = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/auth/logout",
    { withCredentials: true }
  );
  if (result) {
    useSession.setState({ user: null });
    window.location.replace("/login");
  }
}
