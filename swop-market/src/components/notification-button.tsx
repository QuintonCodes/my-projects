"use client";

import { Bell } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { Notification } from "@/lib/stores/notification-store";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type NotificationButtonProps = {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
};

export default function NotificationButton({
  notifications,
  markAsRead,
  markAllAsRead,
}: NotificationButtonProps) {
  const unreadNotifications = notifications.filter((n) => n.unread).length;

  return (
    <HoverCard openDelay={300} closeDelay={300}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="size-5" />
          {unreadNotifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute flex items-center justify-center text-xs text-white bg-red-500 rounded-full size-5 -top-1 -right-1"
            >
              {unreadNotifications}
            </motion.span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" align="end" side="bottom">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Notifications</h4>
            {unreadNotifications > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>
          <div className="space-y-3 overflow-y-auto max-h-80">
            {notifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className="p-2 space-y-1 rounded cursor-pointer hover:bg-muted/50"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium">{notification.title}</p>
                  {notification.unread && (
                    <Badge
                      variant="secondary"
                      className="p-0 bg-blue-500 size-2"
                    ></Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            ))}
            {notifications.length === 0 && (
              <p className="py-4 text-sm text-center text-muted-foreground">
                No notifications
              </p>
            )}
          </div>
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => markAllAsRead()}
              asChild
            >
              <Link href="/messages">View All Notifications</Link>
            </Button>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
