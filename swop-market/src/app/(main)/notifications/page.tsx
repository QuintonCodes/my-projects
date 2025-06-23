"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotificationsStore } from "@/lib/stores/notification-store";
import { Bell, Check, Trash2 } from "lucide-react";

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, removeNotification } =
    useNotificationsStore();

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="w-full px-4 py-8 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-red-800 bg-red-100">
                {unreadCount} unread
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">
                  No notifications yet
                </h3>
                <p className="text-muted-foreground">
                  When you receive messages, orders, or updates, they&apos;ll
                  appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-colors ${
                  notification.unread ? "bg-blue-50 border-blue-200" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {notification.unread && (
                        <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                      )}
                      <div>
                        <CardTitle className="text-base">
                          {notification.title}
                        </CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {notification.unread && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
