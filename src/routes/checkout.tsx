import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MapPin, Truck } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { PrimaryButton, SectionTitle } from "@/components/ui-bits";
import { campaigns, campaignProduct, soles } from "@/lib/mock-data";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Confirmar pedido colectivo — Juntas" },
      {
        name: "description",
        content:
          "Revisa cantidad, precio aplicado por volumen, costo de entrega y total antes de confirmar tu pedido colectivo.",
      },
      { property: "og:title", content: "Confirmar pedido colectivo — Juntas" },
      { property: "og:description", content: "Cantidad, precio aplicado, entrega y total." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const campaign = campaigns[0];
  const product = campaignProduct(campaign);
  const [done, setDone] = useState(false);
  const qty = 12;
  const unitPrice = campaign.bestPrice;
  const subtotal = qty * unitPrice;
  const delivery = 45;
  const igv = Math.round(subtotal * 0.18);
  const total = subtotal + delivery + igv;
  const saving = (product.marketPrice - unitPrice) * qty;

  if (done) {
    return (
      <AppShell title="Pedido confirmado" subtitle="PED-1043">
        <div className="card-surface mx-auto max-w-md p-8 text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary-soft text-primary">
            <CheckCircle2 className="size-8" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold">¡Estás dentro!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tu aporte de {qty} sacos se sumó a la campaña. Te avisamos cuando se alcance la meta y
            se cierre el precio final.
          </p>
          <p className="mt-4 rounded-2xl bg-primary-soft p-3 text-sm font-bold text-primary">
            Ahorro estimado: {soles(saving)}
          </p>
          <Link to="/pedidos" className="mt-5 block">
            <PrimaryButton>Ver mis pedidos</PrimaryButton>
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Confirmar pedido" subtitle={campaign.title} back="/campanas">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <SectionTitle>Resumen del pedido</SectionTitle>
          <div className="card-surface p-4">
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
                <p className="truncate font-bold">{product.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {qty} × {product.unit}
                </p>
                <p className="text-xs font-bold text-primary">
                  Precio colectivo aplicado: {soles(unitPrice)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <SectionTitle>Entrega</SectionTitle>
            <div className="card-surface space-y-3 p-4 text-sm">
              <p className="inline-flex items-center gap-2 font-semibold">
                <MapPin className="size-4 text-primary" /> Av. Ejército 512, Yanahuara, Arequipa
              </p>
              <p className="inline-flex items-center gap-2 text-muted-foreground">
                <Truck className="size-4 text-trust" /> Entrega conjunta estimada: 08 – 10 Sep
              </p>
              <p className="rounded-2xl bg-secondary p-3 text-xs text-muted-foreground">
                El flete se reparte entre las MYPE de la campaña, por eso te cuesta {soles(delivery)}
                en lugar de {soles(180)}.
              </p>
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>Total</SectionTitle>
          <div className="card-surface space-y-2 p-4 text-sm">
            <Row label={`Subtotal (${qty} sacos)`} value={soles(subtotal)} />
            <Row label="Entrega compartida" value={soles(delivery)} />
            <Row label="IGV (18%)" value={soles(igv)} />
            <div className="my-2 border-t border-border" />
            <Row label="Total a pagar" value={soles(total)} strong />
            <p className="mt-2 rounded-2xl bg-primary-soft p-3 text-xs font-bold text-primary">
              Ahorras {soles(saving)} frente a comprar suelto.
            </p>
          </div>
          <div className="mt-4">
            <PrimaryButton onClick={() => setDone(true)}>Confirmar participación</PrimaryButton>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Demo: no se procesa ningún pago.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
      <span className={strong ? "font-bold" : "text-muted-foreground"}>{label}</span>
      <span className={strong ? "shrink-0 text-lg font-extrabold" : "shrink-0 font-semibold"}>
        {value}
      </span>
    </div>
  );
}
