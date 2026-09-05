import { Star } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  hint,
  icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  tone?: "primary" | "trust" | "accent";
}) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    trust: "bg-trust-soft text-trust",
    accent: "bg-accent-soft text-accent-foreground",
  } as const;
  return (
    <div className="card-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="min-w-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        {icon && (
          <span className={cn("grid size-8 shrink-0 place-items-center rounded-xl", tones[tone])}>
            {icon}
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-extrabold tracking-tight">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i <= Math.round(rating) ? "fill-accent text-accent" : "text-border",
          )}
        />
      ))}
      <span className="text-foreground">{rating.toFixed(1)}</span>
      {reviews != null && <span className="text-muted-foreground">({reviews})</span>}
    </span>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <h2 className="min-w-0 truncate text-lg font-bold">{children}</h2>
      {action}
    </div>
  );
}

export function TierTable({
  tiers,
  unit,
  activeMin,
}: {
  tiers: { min: number; price: number }[];
  unit: string;
  activeMin?: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-3 py-2 font-semibold">Volumen</th>
            <th className="px-3 py-2 font-semibold">Precio / {unit}</th>
            <th className="px-3 py-2 text-right font-semibold">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card">
          {tiers.map((t) => {
            const active = activeMin === t.min;
            return (
              <tr key={t.min} className={cn(active && "bg-primary-soft/60")}>
                <td className="px-3 py-2.5 font-medium">desde {t.min}</td>
                <td className="px-3 py-2.5 font-bold">
                  S/ {t.price.toFixed(2)}
                </td>
                <td className="px-3 py-2.5 text-right text-xs">
                  {active ? (
                    <span className="font-bold text-primary">Aplicado</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const statusTones: Record<string, string> = {
  Pendiente: "bg-accent-soft text-accent-foreground",
  Confirmado: "bg-trust-soft text-trust",
  "En camino": "bg-secondary text-secondary-foreground",
  Entregado: "bg-primary-soft text-primary",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2.5 py-1 text-xs font-bold",
        statusTones[status] ?? "bg-secondary",
      )}
    >
      {status}
    </span>
  );
}

export function PrimaryButton({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-full gradient-growth px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </button>
  );
}
