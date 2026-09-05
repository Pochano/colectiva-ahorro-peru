import { Link, createFileRoute } from "@tanstack/react-router";
import { Boxes, PackagePlus, Sparkles, Trash2, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { CampaignProgress } from "@/components/CampaignProgress";
import { MetricCard, PrimaryButton, SectionTitle, TierTable } from "@/components/ui-bits";
import { useCampaigns } from "@/lib/campaign-store";
import {
  campaignProduct,
  getProduct,
  priceForQty,
  products,
  soles,
  suggestedCampaigns,
  type SuggestedCampaign,
} from "@/lib/mock-data";
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

const emptyForm = { productId: products[0].id, title: "", goal: "", days: "", zone: "" };

function Proveedor() {
  const [tab, setTab] = useState<"demanda" | "productos" | "nueva">("demanda");
  const { campaigns, addCampaign, removeCampaign } = useCampaigns();
  const [form, setForm] = useState(emptyForm);
  const [created, setCreated] = useState<string | null>(null);
  const own = campaigns.filter((c) => campaignProduct(c).supplier === "Distribuidora Andina");

  const useSuggestion = (s: SuggestedCampaign) => {
    setForm({
      productId: s.productId,
      title: s.title,
      goal: String(s.goal),
      days: String(s.closesInDays),
      zone: s.zone,
    });
    setCreated(null);
  };

  const publish = () => {
    const c = addCampaign({
      productId: form.productId,
      title: form.title,
      goal: Number(form.goal) || 100,
      closesInDays: Number(form.days) || 7,
      zone: form.zone,
    });
    setCreated(c.id);
    setForm(emptyForm);
  };

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
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-bold">{p.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {c.participants.length} MYPE · cierra en {c.closesIn}
                      </p>
                    </div>
                    {c.isLocal && (
                      <button
                        onClick={() => removeCampaign(c.id)}
                        aria-label="Eliminar campaña"
                        className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>
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
                      <p className="font-extrabold text-primary">{soles(c.goal * c.bestPrice)}</p>
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
        <section className="mt-5 space-y-5">
          <div>
            <SectionTitle>Campañas sugeridas para ti</SectionTitle>
            <p className="mb-3 text-xs text-muted-foreground">
              Basadas en la frecuencia de compra, la estacionalidad y los pedidos recientes de las
              MYPE de tu zona.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {suggestedCampaigns.map((s) => {
                const p = getProduct(s.productId)!;
                const price = priceForQty(p.tiers, s.goal);
                return (
                  <div key={s.productId} className="card-surface p-4">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        width={768}
                        height={768}
                        className="size-12 shrink-0 rounded-2xl bg-secondary object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-bold">{s.title}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {p.unit} · {s.zone}
                        </p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-trust-soft px-2 py-1 text-[11px] font-bold text-trust">
                        <Sparkles className="size-3" /> {s.confidence}%
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground">{s.reason}</p>

                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                      <div className="rounded-xl bg-secondary p-2">
                        <p className="text-muted-foreground">Demanda prevista</p>
                        <p className="text-sm font-bold">{s.predictedDemand}</p>
                      </div>
                      <div className="rounded-xl bg-secondary p-2">
                        <p className="text-muted-foreground">MYPE interesadas</p>
                        <p className="text-sm font-bold">{s.interestedMype}</p>
                      </div>
                      <div className="rounded-xl bg-primary-soft p-2">
                        <p className="text-primary">Ingreso estimado</p>
                        <p className="text-sm font-extrabold text-primary">
                          {soles(s.goal * price)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => useSuggestion(s)}
                      className="mt-3 w-full rounded-2xl bg-secondary py-2.5 text-sm font-bold text-primary"
                    >
                      Usar esta sugerencia
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <SectionTitle>Crear campaña colectiva</SectionTitle>
            <div className="card-surface space-y-3 p-4">
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground">Producto</span>
                <select
                  value={form.productId}
                  onChange={(e) => setForm({ ...form, productId: e.target.value })}
                  className="mt-1 w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <Field
                label="Título de la campaña"
                placeholder="Harina de trigo — cierre de mes"
                value={form.title}
                onChange={(v) => setForm({ ...form, title: v })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Meta (unidades)"
                  placeholder="100"
                  value={form.goal}
                  onChange={(v) => setForm({ ...form, goal: v })}
                />
                <Field
                  label="Cierra en (días)"
                  placeholder="7"
                  value={form.days}
                  onChange={(v) => setForm({ ...form, days: v })}
                />
              </div>
              <Field
                label="Zona de entrega"
                placeholder="Arequipa metropolitana"
                value={form.zone}
                onChange={(v) => setForm({ ...form, zone: v })}
              />
              <PrimaryButton className="mt-2" onClick={publish}>
                <PackagePlus className="size-4" /> Publicar campaña
              </PrimaryButton>

              {created && (
                <div className="rounded-2xl bg-primary-soft p-3 text-sm">
                  <p className="font-bold text-primary">Campaña publicada</p>
                  <p className="text-xs text-muted-foreground">
                    Ya aparece en el listado de campañas activas de la app.
                  </p>
                  <Link
                    to="/campanas/$campaignId"
                    params={{ campaignId: created }}
                    className="mt-2 inline-block text-sm font-bold text-primary"
                  >
                    Ver campaña →
                  </Link>
                </div>
              )}

              <p className="text-center text-xs text-muted-foreground">
                Demo: las campañas se guardan solo en este dispositivo.
              </p>
            </div>
          </div>
        </section>
      )}
    </AppShell>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
