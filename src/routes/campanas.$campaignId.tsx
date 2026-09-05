import { Link, createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Minus, Plus, ShieldCheck, TrendingDown, Users } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { CampaignProgress } from "@/components/CampaignProgress";
import { PrimaryButton, SectionTitle, Stars } from "@/components/ui-bits";
import { useCampaigns } from "@/lib/campaign-store";
import { campaignProduct, campaigns, getCampaign, soles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campanas/$campaignId")({
  head: ({ params }) => {
    const c = getCampaign(params.campaignId);
    const title = c ? `${c.title} — ${c.committed}/${c.goal} comprometidos | Mayora` : "Campaña — Mayora";
    const description = c
      ? `Faltan ${Math.max(0, c.goal - c.committed)} unidades para desbloquear ${soles(c.bestPrice)} por unidad. Súmate a la compra colectiva.`
      : "Campaña de compra colectiva en Mayora.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CampaignDetail,
});

function CampaignDetail() {
  const { campaignId } = Route.useParams();
  const { campaigns: allCampaigns } = useCampaigns();
  const campaign = allCampaigns.find((c) => c.id === campaignId) ?? campaigns[0];
  const product = campaignProduct(campaign);
  const [qty, setQty] = useState(campaign.myQty ?? 10);
  const unitWord = product.unit.split(" ")[0];
  const projected = campaign.committed + qty;
  const activeTier = [...product.tiers].reverse().find((t) => campaign.committed >= t.min)?.min;
  const nextTier = product.tiers.find((t) => t.min > campaign.committed);

  return (
    <AppShell title="Campaña colectiva" subtitle={product.supplier} back="/campanas">
      <section className="card-surface p-5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={768}
            height={768}
            className="size-16 shrink-0 rounded-2xl bg-secondary object-cover"
          />
          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold">{product.name}</h1>
            <p className="truncate text-xs text-muted-foreground">
              {product.unit} · {product.supplier}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
              <Clock className="size-3" /> Cierra en {campaign.closesIn}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <CampaignProgress
            committed={campaign.committed}
            goal={campaign.goal}
            unit={`${unitWord}s`}
            size="lg"
          />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-secondary p-3">
            <p className="text-[11px] font-semibold text-muted-foreground">Precio actual</p>
            <p className="text-lg font-extrabold">{soles(campaign.currentPrice)}</p>
          </div>
          <div className="rounded-2xl bg-primary-soft p-3">
            <p className="text-[11px] font-semibold text-primary">Precio meta</p>
            <p className="text-lg font-extrabold text-primary">{soles(campaign.bestPrice)}</p>
          </div>
          <div className="rounded-2xl bg-accent-soft p-3">
            <p className="text-[11px] font-semibold text-accent-foreground">Precio suelto</p>
            <p className="text-lg font-extrabold text-accent-foreground line-through">
              {soles(product.marketPrice)}
            </p>
          </div>
        </div>

        {nextTier && (
          <p className="mt-4 rounded-2xl bg-trust-soft p-3 text-sm font-semibold text-trust">
            Con {nextTier.min - campaign.committed} {unitWord}s más, el precio baja a{" "}
            {soles(nextTier.price)} para todos.
          </p>
        )}
      </section>

      <section className="mt-6">
        <SectionTitle>Cómo baja el precio por volumen</SectionTitle>
        <div className="card-surface space-y-3 p-4">
          {product.tiers.map((t) => {
            const reached = campaign.committed >= t.min;
            const width = Math.min(100, Math.round((t.min / campaign.goal) * 100)) || 6;
            return (
              <div key={t.min}>
                <div className="mb-1 grid grid-cols-[minmax(0,1fr)_auto] gap-2 text-sm">
                  <span className="min-w-0 truncate font-semibold">
                    desde {t.min} {unitWord}s
                  </span>
                  <span
                    className={cn(
                      "shrink-0 font-extrabold",
                      reached ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {soles(t.price)}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      reached ? "gradient-growth" : "bg-border",
                    )}
                    style={{ width: `${width}%` }}
                  />
                </div>
                {activeTier === t.min && (
                  <p className="mt-1 text-[11px] font-bold text-primary">Tramo aplicado hoy</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle
          action={
            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-muted-foreground">
              <Users className="size-4" /> {campaign.participants.length} MYPE
            </span>
          }
        >
          Quiénes participan
        </SectionTitle>
        <div className="card-surface divide-y divide-border">
          {campaign.participants.map((p) => {
            const save = (product.marketPrice - campaign.bestPrice) * p.qty;
            return (
              <div key={p.mype} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{p.mype}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {p.tipo} · aporta {p.qty} {unitWord}s
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">
                  <TrendingDown className="size-3.5" /> ahorra {soles(save)}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle>Proveedor de la campaña</SectionTitle>
        <div className="card-surface flex items-center gap-3 p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-trust-soft text-trust">
            <ShieldCheck className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold">{product.supplier}</p>
            <p className="inline-flex items-center gap-1 truncate text-xs text-muted-foreground">
              <MapPin className="size-3" /> {product.location}
            </p>
            <div className="mt-1">
              <Stars rating={product.supplierRating} reviews={126} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 mb-6">
        <SectionTitle>Unirme a esta campaña</SectionTitle>
        <div className="card-surface p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-11 place-items-center rounded-full bg-secondary"
                aria-label="Quitar"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-12 text-center text-2xl font-extrabold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid size-11 place-items-center rounded-full gradient-growth text-primary-foreground"
                aria-label="Agregar"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total estimado</p>
              <p className="text-lg font-extrabold">{soles(qty * campaign.bestPrice)}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Con tu aporte la campaña llegaría a{" "}
            <span className="font-bold text-foreground">
              {projected} / {campaign.goal}
            </span>{" "}
            {unitWord}s.
          </p>
        </div>
      </section>

      <div className="sticky bottom-24 md:bottom-6">
        <Link to="/checkout">
          <PrimaryButton>
            Unirme con {qty} {unitWord}s · {soles(qty * campaign.bestPrice)}
          </PrimaryButton>
        </Link>
      </div>
    </AppShell>
  );
}
