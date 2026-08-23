import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export default function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-surface-raised flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-ink-faint" />
      </div>
      <p className="font-semibold text-ink-body">{title}</p>
      {description && (
        <p className="text-sm text-ink-muted mt-1 max-w-sm">{description}</p>
      )}
    </div>
  );
}
