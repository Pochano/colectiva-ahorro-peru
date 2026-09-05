import { Link, createFileRoute } from "@tanstack/react-router";
import { PiggyBank, Repeat, Sparkles, Truck, Users } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { CampaignCard } from "@/components/CampaignCard";
import { MetricCard, SectionTitle, StatusPill } from "@/components/ui-bits";
import {
  campaigns,
  currentMype,
  frequentProducts,
  getProduct,
  orders,
  soles,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Mi panel — Mayora" },
      {
        name: "description",
        content:
          "Campañas en las que participas, pedidos próximos y tu ahorro acumulado comprando en grupo.",
      },
      { property: "og:title", content: "Mi panel — Mayora" },
      {
        property: "og:description",
        content: "Panel de la MYPE: campañas, pedidos y ahorro acumulado.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const mine = campaigns.filter((c) => c.joined);
  const open = campaigns.filter((c) => !c.joined);

  return (
    <AppShell title={`Hola, ${currentMype.name.split(" ").slice(-2).join(" ")}`} subtitle="Yanahuara, Arequipa">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard
          label="Ahorro acumulado"
          value={soles(currentMype.savings)}
          hint="en los últimos 3 meses"
          icon={<PiggyBank className="size-4" />}
        />
        <MetricCard
          label="Campañas activas"
          value={String(mine.length)}
          hint="con tu pedido comprometido"
          icon={<Users className="size-4" />}
          tone="trust"
        />
        <MetricCard
          label="Próximo pedido"
          value="04 Sep"
          hint="PED-1042 · 12 sacos harina"
          icon={<Truck className="size-4" />}
          tone="accent"
        />
        <MetricCard
          label="Ahorro este mes"
          value={soles(756)}
          hint="vs. tu precio habitual"
          icon={<Sparkles className="size-4" />}
        />
      </div>

      <section className="mt-8">
        <SectionTitle
          action={
            <Link to="/campanas" className="shrink-0 text-sm font-bold text-primary">
              Ver todas
            </Link>
          }
        >
          Tus campañas en curso
        </SectionTitle>
        <div className="grid gap-3 md:grid-cols-2">
          {mine.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle>Recomendadas para ti</SectionTitle>
        <p className="-mt-2 mb-3 text-xs text-muted-foreground">
          Según lo que compras cada mes en repostería.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {open.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle
          action={
            <Link to="/pedidos" className="shrink-0 text-sm font-bold text-primary">
              Mis pedidos
            </Link>
          }
        >
          Próximos pedidos
        </SectionTitle>
        <div className="card-surface divide-y divide-border">
          {orders.slice(0, 3).map((o) => (
            <div key={o.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-semibold">{o.product}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {o.id} · {o.qty} unid. · {soles(o.total)}
                </p>
              </div>
              <StatusPill status={o.status} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 mb-4">
        <SectionTitle
          action={
            <Link to="/solicitar" className="shrink-0 text-sm font-bold text-primary">
              Pedir otro producto
            </Link>
          }
        >
          Tus compras frecuentes
        </SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          {frequentProducts.map((id) => {
            const p = getProduct(id)!;
            return (
              <Link
                key={id}
                to="/catalogo/$productId"
                params={{ productId: id }}
                className="card-surface p-3 text-center"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="mx-auto size-16 rounded-2xl object-cover"
                />
                <p className="mt-2 truncate text-xs font-bold">{p.name}</p>
                <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Repeat className="size-3" /> mensual
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
