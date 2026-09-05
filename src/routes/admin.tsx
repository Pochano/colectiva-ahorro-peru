import { createFileRoute } from "@tanstack/react-router";
import { Building2, Layers, Users, Wallet } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { MetricCard, SectionTitle, Stars, StatusPill } from "@/components/ui-bits";
import { campaignProduct, campaigns, soles, suppliers } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel administrativo — Mayora" },
      {
        name: "description",
        content:
          "Métricas generales de la plataforma: campañas activas, MYPE registradas, proveedores y volumen transado.",
      },
      { property: "og:title", content: "Panel administrativo — Mayora" },
      { property: "og:description", content: "Campañas, usuarios y métricas de la plataforma." },
    ],
  }),
  component: Admin,
});

const users = [
  { name: "Pastelería Dulce Sur", tipo: "MYPE · Pastelería", estado: "Activo" },
  { name: "Panadería Arequipeña", tipo: "MYPE · Panadería", estado: "Activo" },
  { name: "Cafetería Misti", tipo: "MYPE · Cafetería", estado: "Activo" },
  { name: "Distribuidora Andina", tipo: "Proveedor", estado: "Verificado" },
  { name: "Bodega Santa Marta", tipo: "MYPE · Bodega", estado: "Pendiente" },
];

function Admin() {
  return (
    <AppShell title="Administración" subtitle="Vista general de la plataforma">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Campañas activas" value="3" hint="1 cierra en 2 días" icon={<Layers className="size-4" />} />
        <MetricCard label="MYPE registradas" value="124" hint="+12 este mes" icon={<Users className="size-4" />} tone="trust" />
        <MetricCard label="Proveedores" value="8" hint="3 verificados" icon={<Building2 className="size-4" />} tone="accent" />
        <MetricCard label="Volumen transado" value={soles(96350)} hint="setiembre" icon={<Wallet className="size-4" />} />
      </div>

      <section className="mt-8">
        <SectionTitle>Campañas</SectionTitle>
        <div className="card-surface divide-y divide-border">
          {campaigns.map((c) => (
            <div key={c.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-semibold">{campaignProduct(c).name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {c.committed}/{c.goal} unid. · {c.participants.length} MYPE ·{" "}
                  {campaignProduct(c).supplier}
                </p>
              </div>
              <StatusPill
                status={c.committed / c.goal >= 0.8 ? "Confirmado" : "Pendiente"}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle>Usuarios</SectionTitle>
        <div className="card-surface divide-y divide-border">
          {users.map((u) => (
            <div key={u.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-semibold">{u.name}</p>
                <p className="truncate text-xs text-muted-foreground">{u.tipo}</p>
              </div>
              <StatusPill status={u.estado === "Verificado" ? "Entregado" : u.estado} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 mb-4">
        <SectionTitle>Calificación de proveedores</SectionTitle>
        <div className="card-surface divide-y divide-border">
          {suppliers.map((s) => (
            <div key={s.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-semibold">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {s.location} · {s.campaigns} campañas
                </p>
              </div>
              <Stars rating={s.rating} reviews={s.reviews} />
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
