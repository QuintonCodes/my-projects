import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  color: string;
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
}: StatCardProps) {
  return (
    <div className="glass backdrop-blur-[1px] shadow-xl rounded-2xl p-6 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className={cn("h-5 w-5", color)} />
      </div>
      <div>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{trend}</p>
      </div>
    </div>
  );
}
