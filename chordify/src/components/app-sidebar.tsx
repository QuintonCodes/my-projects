"use client";

import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Heart,
  Home,
  Library,
  ListMusic,
  Music,
  Pin,
  Plus,
  Search,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AuthButton } from "./auth-button";
import { CreatePlaylistDialog } from "./create-playlist-dialog";

type SidebarProps = {
  className?: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export function AppSidebar({
  className,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: Library, label: "Your Library", href: "/library" },
  ];

  const libraryItems = [
    { icon: ListMusic, label: "Liked Songs", href: "/liked" },
    { icon: Heart, label: "Favourites", href: "/favourites", badge: "New" },
    { icon: Clock, label: "Recently Played", href: "/recent" },
    { icon: Compass, label: "Discover", href: "/discover" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  const pinnedPlaylists = [
    { id: 1, name: "Chill Vibes", songsCount: 45 },
    { id: 2, name: "Workout Mix", songsCount: 32 },
    { id: 3, name: "Focus Flow", songsCount: 28 },
  ];

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed left-4 top-4 bottom-4 z-50 glass backdrop-blur-[1px] rounded-2xl overflow-hidden shadow-xl",
        className
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pr-5 border-b border-border/50">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <Music className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Chordify</h1>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8 hover:bg-primary/10 rounded-full"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          {/* Main Menu */}
          <nav className="space-y-10 gap-10 py-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.label} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 hover:bg-primary/10 hover:text-primary transition-colors",
                      isCollapsed && "justify-center px-2",
                      isActive && "bg-primary/10 text-primary"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Library Section */}
          <div className="py-4 border-t border-border/50">
            {!isCollapsed && (
              <h2 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Library
              </h2>
            )}
            <nav className="space-y-4">
              {libraryItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.label} href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 hover:bg-primary/10 hover:text-primary relative transition-colors",
                        isCollapsed && "justify-center px-2",
                        isActive && "bg-primary/10 text-primary"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-sm font-medium"
                            >
                              {item.label}
                            </motion.span>
                            {item.badge && (
                              <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </AnimatePresence>
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Pinned Playlists */}
          {!isCollapsed && (
            <div className="py-4 border-t border-border/50">
              <div className="flex items-center justify-between px-3 mb-2">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Pinned Playlists
                </h2>
                <CreatePlaylistDialog
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-primary/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  }
                />
              </div>
              <nav className="space-y-1">
                {pinnedPlaylists.map((playlist) => (
                  <Button
                    key={playlist.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 hover:bg-primary/10 hover:text-primary"
                  >
                    <Pin className="h-4 w-4 shrink-0 text-primary" />
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="text-sm font-medium truncate">
                        {playlist.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {playlist.songsCount} songs
                      </span>
                    </div>
                  </Button>
                ))}
              </nav>
            </div>
          )}
        </ScrollArea>

        <div className="mt-auto p-4 border-t border-border/50 space-y-3">
          <AuthButton isCollapsed={isCollapsed} />
        </div>
      </div>
    </motion.aside>
  );
}
