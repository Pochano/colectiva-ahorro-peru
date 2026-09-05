import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { MetricCard, SectionTitle, StatusPill } from "@/components/ui-bits";
import { orders, soles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Mis pedidos e historial — Mayora" },
      {
        name: "description",
        content:
          "Sigue el estado de tus pedidos colectivos: pendiente, confirmado, en camino y entregado, con tu historial de compras.",
      },
      { property: "og:title", content: "Mis pedidos e historial — Mayora" },
      { property: "og:description", content: "Estado de pedidos e historial de compras." },
    ],
  }),
  component: Pedidos,
});

const filters = ["Todos", "Pendiente", "Confirmado", "En camino", "Entregado"] as const;

function Pedidos() {
  const [f, setF] = useState<string>("Todos");
  const list = orders.filter((o) => f === "Todos" || o.status === f);
  const spent = orders.reduce((s, o) => s + o.total, 0);

  return (
    <AppShell title="Mis pedidos" subtitle="Pastelería Dulce Sur">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <MetricCard label="Pedidos" value={String(orders.length)} hint="últimos 90 días" />
        <MetricCard label="Total comprado" value={soles(spent)} hint="en insumos" tone="trust" />
        <MetricCard label="Ahorro logrado" value={soles(2480)} hint="vs. precio suelto" tone="accent" />
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {filters.map((x) => (
          <button
            key={x}
            onClick={() => setF(x)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold",
              f === x ? "gradient-growth text-primary-foreground" : "bg-secondary text-secondary-foreground",
            )}
          >
            {x}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <SectionTitle>Historial de compras</SectionTitle>
        <div className="space-y-3">
          {list.map((o) => (
            <div key={o.id} className="card-surface p-4">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="truncate font-bold">{o.product}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {o.id} · {o.date}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{o.campaign}</p>
                </div>
                <StatusPill status={o.status} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-secondary p-2">
                  <p className="text-muted-foreground">Cantidad</p>
                  <p className="font-bold">{o.qty}</p>
                </div>
                <div className="rounded-xl bg-secondary p-2">
                  <p className="text-muted-foreground">Precio unit.</p>
                  <p className="font-bold">{soles(o.unitPrice)}</p>
                </div>
                <div className="rounded-xl bg-primary-soft p-2">
                  <p className="text-primary">Total</p>
                  <p className="font-extrabold text-primary">{soles(o.total)}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {["Pendiente", "Confirmado", "En camino", "Entregado"].map((s, i) => {
                  const idx = ["Pendiente", "Confirmado", "En camino", "Entregado"].indexOf(o.status);
                  return (
                    <div
                      key={s}
                      className={cn(
                        "h-1.5 flex-1 rounded-full",
                        i <= idx ? "gradient-growth" : "bg-muted",
                      )}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Link to="/catalogo" className="mt-4 block text-center text-sm font-bold text-primary">
          Volver a comprar
        </Link>
      </div>
    </AppShell>
  );
}
