import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Home,
  LayoutGrid,
  Package,
  Store,
  Users,
  ChevronLeft,
  Sprout,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { notifications, currentMype } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Inicio", icon: Home },
  { to: "/catalogo", label: "Catálogo", icon: LayoutGrid },
  { to: "/campanas", label: "Campañas", icon: Users },
  { to: "/pedidos", label: "Pedidos", icon: Package },
  { to: "/proveedor", label: "Proveedor", icon: Store },
] as const;

export function AppShell({
  children,
  title,
  subtitle,
  back,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  back?: string;
}) {
  const [openNotifs, setOpenNotifs] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          {back ? (
            <Link
              to={back}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"
              aria-label="Volver"
            >
              <ChevronLeft className="size-5" />
            </Link>
          ) : (
            <Link to="/" className="grid size-10 shrink-0 place-items-center rounded-2xl gradient-growth text-primary-foreground">
              <Sprout className="size-5" />
            </Link>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold">{title ?? "Juntas"}</p>
            <p className="truncate text-xs text-muted-foreground">
              {subtitle ?? `${currentMype.name} · ${currentMype.location}`}
            </p>
          </div>
          <nav className="hidden shrink-0 items-center gap-1 md:flex">
            {navItems.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-semibold transition-colors",
                  pathname.startsWith(i.to)
                    ? "bg-primary-soft text-primary"
                    : "text-muted-foreground hover:bg-secondary",
                )}
              >
                {i.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setOpenNotifs((v) => !v)}
            className="relative grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"
            aria-label="Notificaciones"
          >
            <Bell className="size-5" />
            {unread > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {unread}
              </span>
            )}
          </button>
        </div>
        {openNotifs && (
          <div className="border-t border-border bg-card">
            <div className="mx-auto max-w-6xl divide-y divide-border px-4">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3 py-3">
                  <span
                    className={cn(
                      "mt-1.5 size-2 shrink-0 rounded-full",
                      n.unread ? "bg-accent" : "bg-border",
                    )}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.body}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {navItems.map((i) => {
            const active = pathname.startsWith(i.to);
            return (
              <Link
                key={i.to}
                to={i.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-full",
                    active && "bg-primary-soft",
                  )}
                >
                  <i.icon className="size-5" />
                </span>
                {i.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
