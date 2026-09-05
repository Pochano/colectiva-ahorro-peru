import { createFileRoute } from "@tanstack/react-router";
import { Boxes, PackagePlus, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { CampaignProgress } from "@/components/CampaignProgress";
import { MetricCard, PrimaryButton, SectionTitle, TierTable } from "@/components/ui-bits";
import { campaignProduct, campaigns, products, soles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/proveedor")({
  head: () => ({
    meta: [
      { title: "Panel del proveedor — Juntas" },
      {
        name: "description",
        content:
          "Publica productos, define precios por volumen y sigue cuánta demanda agregan tus campañas colectivas.",
      },
      { property: "og:title", content: "Panel del proveedor — Juntas" },
      { property: "og:description", content: "Demanda agregada, precios por volumen y campañas." },
    ],
  }),
  component: Proveedor,
});

function Proveedor() {
  const [tab, setTab] = useState<"demanda" | "productos" | "nueva">("demanda");
  const own = campaigns.filter((c) => campaignProduct(c).supplier === "Distribuidora Andina");

  return (
    <AppShell title="Distribuidora Andina" subtitle="Proveedor mayorista · Cercado, Arequipa">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard
          label="Demanda agregada"
          value="115 unid."
          hint="en campañas abiertas"
          icon={<TrendingUp className="size-4" />}
        />
        <MetricCard
          label="MYPE alcanzadas"
          value="9"
          hint="compradores activos"
          icon={<Users className="size-4" />}
          tone="trust"
        />
        <MetricCard
          label="Productos publicados"
          value="3"
          hint="con precios por volumen"
          icon={<Boxes className="size-4" />}
          tone="accent"
        />
        <MetricCard label="Ventas del mes" value={soles(18420)} hint="+22% vs. agosto" />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-1 rounded-full bg-secondary p-1">
        {(["demanda", "productos", "nueva"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full py-2 text-xs font-bold sm:text-sm",
              tab === t ? "bg-card text-primary shadow-[var(--shadow-card)]" : "text-muted-foreground",
            )}
          >
            {t === "demanda" ? "Campañas" : t === "productos" ? "Mis productos" : "Nueva campaña"}
          </button>
        ))}
      </div>

      {tab === "demanda" && (
        <section className="mt-5">
          <SectionTitle>Demanda por campaña</SectionTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {own.map((c) => {
              const p = campaignProduct(c);
              return (
                <div key={c.id} className="card-surface p-4">
                  <p className="truncate font-bold">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {c.participants.length} MYPE · cierra en {c.closesIn}
                  </p>
                  <div className="mt-4">
                    <CampaignProgress committed={c.committed} goal={c.goal} unit="unid." />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="rounded-xl bg-secondary p-2">
                      <p className="text-muted-foreground">Precio actual</p>
                      <p className="font-bold">{soles(c.currentPrice)}</p>
                    </div>
                    <div className="rounded-xl bg-primary-soft p-2">
                      <p className="text-primary">Ingreso proyectado</p>
                      <p className="font-extrabold text-primary">
                        {soles(c.goal * c.bestPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {tab === "productos" && (
        <section className="mt-5 space-y-4">
          <SectionTitle>Productos y precios por volumen</SectionTitle>
          {products
            .filter((p) => p.supplier === "Distribuidora Andina")
            .map((p) => (
              <div key={p.id} className="card-surface p-4">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="size-14 shrink-0 rounded-2xl bg-secondary object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-bold">{p.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.unit} · mínimo {p.minQty}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <TierTable tiers={p.tiers} unit={p.unit.split(" ")[0]} />
                </div>
              </div>
            ))}
        </section>
      )}

      {tab === "nueva" && (
        <section className="mt-5">
          <SectionTitle>Crear campaña colectiva</SectionTitle>
          <div className="card-surface space-y-3 p-4">
            <Field label="Producto" placeholder="Harina de trigo industrial" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Meta (unidades)" placeholder="100" />
              <Field label="Cierra en (días)" placeholder="7" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Precio base S/" placeholder="152.00" />
              <Field label="Precio meta S/" placeholder="128.00" />
            </div>
            <Field label="Zona de entrega" placeholder="Arequipa metropolitana" />
            <PrimaryButton className="mt-2">
              <PackagePlus className="size-4" /> Publicar campaña
            </PrimaryButton>
            <p className="text-center text-xs text-muted-foreground">
              Demo visual: no se guarda información.
            </p>
          </div>
        </section>
      )}
    </AppShell>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        placeholder={placeholder}
        className="mt-1 w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
