import { Link, createFileRoute } from "@tanstack/react-router";
import { MapPin, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { CampaignCard } from "@/components/CampaignCard";
import { PrimaryButton, SectionTitle, Stars, TierTable } from "@/components/ui-bits";
import { campaigns, getProduct, priceForQty, products, soles } from "@/lib/mock-data";

export const Route = createFileRoute("/catalogo/$productId")({
  head: ({ params }) => {
    const p = getProduct(params.productId);
    const title = p ? `${p.name} — precios por volumen | Mayora` : "Producto — Mayora";
    const description = p
      ? `${p.name} (${p.unit}) de ${p.supplier}. Desde ${soles(p.tiers[p.tiers.length - 1].price)} comprando en grupo.`
      : "Insumo mayorista en Mayora.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { productId } = Route.useParams();
  const product = getProduct(productId) ?? products[0];
  const [qty, setQty] = useState(12);
  const unitPrice = priceForQty(product.tiers, product.minQty);
  const myPrice = priceForQty(product.tiers, qty);
  const activeTier = [...product.tiers].reverse().find((t) => product.minQty >= t.min)?.min;
  const related = campaigns.filter((c) => c.productId === product.id);

  return (
    <AppShell title={product.name} subtitle={product.unit} back="/catalogo">
      <img
        src={product.image}
        alt={product.name}
        width={768}
        height={768}
        className="aspect-square w-full rounded-3xl bg-secondary object-cover md:max-w-sm"
      />

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.unit} · {product.category}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-extrabold text-primary">{soles(unitPrice)}</p>
          <p className="text-xs text-muted-foreground line-through">{soles(product.marketPrice)}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>

      <div className="card-surface mt-4 flex items-center gap-3 p-4">
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

      <section className="mt-6">
        <SectionTitle>Precios escalonados por volumen</SectionTitle>
        <TierTable tiers={product.tiers} unit={product.unit.split(" ")[0]} activeMin={activeTier} />
        <p className="mt-2 text-xs text-muted-foreground">
          Cantidad mínima del proveedor: {product.minQty} {product.unit.split(" ")[0]}s. Se alcanza
          uniendo pedidos de varias MYPE.
        </p>
      </section>

      <section className="mt-6">
        <SectionTitle>¿Cuánto necesitas?</SectionTitle>
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
              <p className="text-xs text-muted-foreground">Tu precio individual</p>
              <p className="text-lg font-extrabold">{soles(myPrice)}</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-primary-soft p-3 text-sm">
            <p className="font-bold text-primary">
              Uniéndote a una campaña pagarías {soles(product.tiers[product.tiers.length - 1].price)}
            </p>
            <p className="text-xs text-muted-foreground">
              Ahorro estimado de {soles((myPrice - product.tiers[product.tiers.length - 1].price) * qty)} en
              este pedido.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 mb-6">
        <SectionTitle>Campañas colectivas para este producto</SectionTitle>
        {related.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {related.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        ) : (
          <div className="card-surface p-5 text-center text-sm text-muted-foreground">
            Aún no hay campaña abierta para este insumo.
            <Link to="/solicitar" className="mt-2 block font-bold text-primary">
              Solicitar una campaña
            </Link>
          </div>
        )}
      </section>

      <div className="sticky bottom-24 md:bottom-6">
        {related[0] ? (
          <Link to="/campanas/$campaignId" params={{ campaignId: related[0].id }}>
            <PrimaryButton>
              <Truck className="size-4" /> Unirme con {qty} {product.unit.split(" ")[0]}s
            </PrimaryButton>
          </Link>
        ) : (
          <Link to="/campanas">
            <PrimaryButton>Ver campañas activas</PrimaryButton>
          </Link>
        )}
      </div>
    </AppShell>
  );
}
