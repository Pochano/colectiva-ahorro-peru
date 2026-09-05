import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/AppShell";
import { PrimaryButton, SectionTitle } from "@/components/ui-bits";

export const Route = createFileRoute("/solicitar")({
  head: () => ({
    meta: [
      { title: "Solicitar un insumo no disponible — Juntas" },
      {
        name: "description",
        content:
          "Pide un insumo que aún no está en el catálogo y buscamos proveedores mayoristas en Arequipa para abrir una campaña.",
      },
      { property: "og:title", content: "Solicitar un insumo no disponible — Juntas" },
      { property: "og:description", content: "Cuéntanos qué insumo necesitas y en qué volumen." },
    ],
  }),
  component: Solicitar,
});

function Solicitar() {
  const [sent, setSent] = useState(false);

  return (
    <AppShell title="Solicitar producto" subtitle="No lo encontraste en el catálogo" back="/catalogo">
      <div className="mx-auto max-w-md">
        {sent ? (
          <div className="card-surface p-8 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary-soft text-primary">
              <CheckCircle2 className="size-8" />
            </span>
            <h1 className="mt-4 text-xl font-extrabold">Solicitud enviada</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Buscaremos proveedores en Arequipa y te avisamos si se abre una campaña para este
              insumo.
            </p>
          </div>
        ) : (
          <>
            <SectionTitle>¿Qué insumo necesitas?</SectionTitle>
            <div className="card-surface space-y-3 p-4">
              <Field label="Producto" placeholder="Leche en polvo entera" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Cantidad mensual" placeholder="15 sacos" />
                <Field label="Presentación" placeholder="Saco 25 kg" />
              </div>
              <Field label="Precio que pagas hoy" placeholder="S/ 240 por saco" />
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground">Detalles</span>
                <textarea
                  rows={4}
                  placeholder="Marca preferida, frecuencia de compra, requisitos de entrega…"
                  className="mt-1 w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </label>
              <PrimaryButton onClick={() => setSent(true)}>
                <Send className="size-4" /> Enviar solicitud
              </PrimaryButton>
            </div>
          </>
        )}
      </div>
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
