import { X } from "lucide-react";

export default function FilterBadge({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 rounded-full hover:bg-background p-0.5"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
