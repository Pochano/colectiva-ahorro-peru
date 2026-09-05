import { cn } from "@/lib/utils";

export function CampaignProgress({
  committed,
  goal,
  unit = "unidades",
  size = "md",
  className,
}: {
  committed: number;
  goal: number;
  unit?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const pct = Math.min(100, Math.round((committed / goal) * 100));
  const remaining = Math.max(0, goal - committed);
  const height = size === "lg" ? "h-5" : size === "sm" ? "h-2" : "h-3";

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2">
        <p className={cn("min-w-0 font-bold", size === "lg" ? "text-lg" : "text-sm")}>
          {committed} / {goal}{" "}
          <span className="font-medium text-muted-foreground">{unit} comprometidas</span>
        </p>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-xs font-bold",
            pct >= 80
              ? "bg-primary-soft text-primary"
              : pct >= 45
                ? "bg-trust-soft text-trust"
                : "bg-accent-soft text-accent-foreground",
          )}
        >
          {pct}%
        </span>
      </div>
      <div className={cn("w-full overflow-hidden rounded-full bg-muted", height)}>
        <div
          className={cn("gradient-growth h-full rounded-full transition-all duration-700")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={cn("mt-2 text-muted-foreground", size === "lg" ? "text-sm" : "text-xs")}>
        {remaining > 0 ? (
          <>
            Faltan <span className="font-semibold text-foreground">{remaining} {unit}</span> para
            desbloquear el mejor precio
          </>
        ) : (
          <span className="font-semibold text-primary">¡Meta alcanzada! Precio mayorista activo</span>
        )}
      </p>
    </div>
  );
}
