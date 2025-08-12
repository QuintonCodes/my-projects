"use client";

import { Heart, LogOut, Settings, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserWithSeller } from "@/context/auth-provider";
import { deleteSession } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserMenuProps = {
  user: UserWithSeller | null;
  logout: () => Promise<void>;
};

export default function UserMenu({ user, logout: logoutStore }: UserMenuProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await deleteSession();
      await logoutStore(); // local store update
      toast.success("You have logged out.");
      router.refresh();
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-full size-10">
          <Avatar className="size-10">
            <AvatarImage src={user?.avatarUrl || ""} alt={user?.firstName} />
            <AvatarFallback>
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src={user?.avatarUrl || ""} alt={user?.firstName} />
              <AvatarFallback>
                {user?.firstName.charAt(0)}
                {user?.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/account")}>
          <Settings className="mr-2 size-4" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/market")}>
          <Store className="mr-2 size-4" />
          <span>My Market</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/favourites")}>
          <Heart className="mr-2 size-4" />
          <span>Favourites</span>
        </DropdownMenuItem>
        {user?.role === "admin" && (
          <DropdownMenuItem onClick={() => router.push("/admin")}>
            <Settings className="mr-2 size-4" />
            <span>Admin Dashboard</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
