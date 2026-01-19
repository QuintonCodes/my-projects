"use client";

import { LogIn, LogOut, Settings, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SpotifyLoginModal } from "./spotify-login-modal";

type AuthButtonProps = {
  isCollapsed?: boolean;
};

export function AuthButton({ isCollapsed }: AuthButtonProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<{
    name: string;
    email: string;
    imageUrl: string;
    spotifyId: string;
  } | null>(null);
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("spotify_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("spotify_user");
      }
    }
  }, []);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("spotify_user");
    setIsAuthenticated(false);
    setUser(null);
    toast.success("Logged out successfully");
  };

  if (!isAuthenticated) {
    return (
      <>
        <Button
          onClick={handleLogin}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <LogIn className="h-5 w-5 shrink-0" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-semibold"
              >
                Login with Spotify
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        <SpotifyLoginModal
          open={showLoginModal}
          onOpenChange={setShowLoginModal}
        />
      </>
    );
  }

  if (isCollapsed) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full p-2 hover:bg-primary/10">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.imageUrl || "/placeholder.svg"}
                alt={user?.name}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 glass backdrop-blur-xl"
        >
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-semibold">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/profile">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-auto p-3 hover:bg-primary/10"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user?.imageUrl || "/placeholder.svg"}
              alt={user?.name}
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start flex-1 min-w-0">
            <span className="text-sm font-semibold truncate w-full">
              {user?.name}
            </span>
            <span className="text-xs text-muted-foreground truncate w-full">
              {user?.email}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glass backdrop-blur-xl">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-semibold">{user?.name}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>
            <User className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
