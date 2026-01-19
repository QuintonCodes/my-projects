import { Clock } from "lucide-react";

export function RecentActivityCard() {
  const activities = [
    {
      id: 1,
      action: "Added to Favourites",
      item: "Blinding Lights",
      artist: "The Weeknd",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Created playlist",
      item: "Summer Hits 2024",
      artist: "25 songs",
      time: "5 hours ago",
    },
    {
      id: 3,
      action: "Achievement unlocked",
      item: "Music Explorer",
      artist: "Level 12",
      time: "1 day ago",
    },
    {
      id: 4,
      action: "Pinned playlist",
      item: "Workout Mix",
      artist: "32 songs",
      time: "2 days ago",
    },
  ];

  return (
    <div className="glass backdrop-blur-[1px] shadow-xl rounded-2xl p-6 space-y-4">
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className={`pb-4 ${
            index !== activities.length - 1 ? "border-b border-black/10" : ""
          }`}
        >
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {activity.action}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {activity.item}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{activity.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
