import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export type AchievementCardProps = {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  isLocked: boolean;
  unlockedDate?: string;
  progress?: number;
  total?: number;
  category: string;
};

const rarityColors = {
  common: "border-muted-foreground/30 bg-muted/10",
  rare: "border-blue-500/30 bg-blue-500/10",
  epic: "border-purple-500/30 bg-purple-500/10",
  legendary: "border-primary/30 bg-primary/10",
};

const rarityTextColors = {
  common: "text-muted-foreground",
  rare: "text-blue-500",
  epic: "text-purple-500",
  legendary: "text-primary",
};

export function AchievementCard({
  title,
  description,
  icon,
  xp,
  rarity,
  isLocked,
  unlockedDate,
  progress = 0,
  total = 100,
  category,
}: AchievementCardProps) {
  const progressPercentage = total > 0 ? (progress / total) * 100 : 0;

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 space-y-4 border-2 transition-all",
        rarityColors[rarity],
        isLocked && "opacity-70",
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "text-4xl glass-dark rounded-xl p-3 flex items-center justify-center",
            isLocked && "grayscale",
          )}
        >
          {icon}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-wider",
              rarityTextColors[rarity],
            )}
          >
            {rarity}
          </span>
          <div className="flex items-center gap-1 text-sm font-bold text-foreground">
            <span>+{xp} XP</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-foreground text-lg text-balance">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {isLocked && progress !== undefined && total !== undefined ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {progress} / {total}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      ) : (
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground capitalize">{category}</span>
            {unlockedDate && (
              <span className="text-muted-foreground">
                {new Date(unlockedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
