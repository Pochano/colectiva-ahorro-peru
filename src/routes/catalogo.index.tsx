import { Link, createFileRoute } from "@tanstack/react-router";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/AppShell";
import { SectionTitle, Stars } from "@/components/ui-bits";
import { categories, products, soles, suppliers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/catalogo/")({
  head: () => ({
    meta: [
      { title: "Catálogo de insumos mayoristas — Juntas" },
      {
        name: "description",
        content:
          "Harina, azúcar, chocolate, margarina y aceite de proveedores mayoristas de Arequipa, con precio de referencia y cantidad mínima.",
      },
      { property: "og:title", content: "Catálogo de insumos mayoristas — Juntas" },
      {
        property: "og:description",
        content: "Explora insumos por categoría, proveedor, precio y cantidad mínima.",
      },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  const [cat, setCat] = useState("Todas");
  const [q, setQ] = useState("");
  const [supplier, setSupplier] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(400);
  const [minQty, setMinQty] = useState("Cualquiera");
  const [showFilters, setShowFilters] = useState(false);

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "Todas" || p.category === cat) &&
          (supplier === "Todos" || p.supplier === supplier) &&
          p.refPrice <= maxPrice &&
          (minQty === "Cualquiera" ||
            (minQty === "Hasta 50" ? p.minQty <= 50 : p.minQty > 50)) &&
          p.name.toLowerCase().includes(q.toLowerCase()),
      ),
    [cat, q, supplier, maxPrice, minQty],
  );

  return (
    <AppShell title="Catálogo" subtitle="Insumos mayoristas en Arequipa">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
        <label className="relative min-w-0">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar harina, azúcar…"
            className="w-full rounded-full border border-input bg-card py-3 pl-11 pr-4 text-sm outline-none focus:border-primary"
          />
        </label>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-full border border-border",
            showFilters ? "bg-primary-soft text-primary" : "bg-card",
          )}
          aria-label="Filtros"
        >
          <SlidersHorizontal className="size-5" />
        </button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold",
              cat === c ? "gradient-growth text-primary-foreground" : "bg-secondary text-secondary-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {showFilters && (
        <div className="card-surface mt-3 space-y-4 p-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Proveedor
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Todos", ...suppliers.map((s) => s.name)].map((s) => (
                <button
                  key={s}
                  onClick={() => setSupplier(s)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold",
                    supplier === s ? "bg-trust-soft text-trust" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Cantidad mínima
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Cualquiera", "Hasta 50", "Más de 50"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMinQty(m)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold",
                    minQty === m ? "bg-accent-soft text-accent-foreground" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Precio máximo
              </p>
              <p className="text-sm font-bold text-primary">{soles(maxPrice)}</p>
            </div>
            <input
              type="range"
              min={30}
              max={400}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--color-primary)]"
            />
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2 text-xs font-semibold">
            <MapPin className="size-4 text-primary" /> Ubicación: Arequipa (todos los distritos)
          </div>
        </div>
      )}

      <div className="mt-5">
        <SectionTitle>{list.length} productos disponibles</SectionTitle>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {list.map((p) => (
            <Link
              key={p.id}
              to="/catalogo/$productId"
              params={{ productId: p.id }}
              className="card-surface overflow-hidden transition-transform active:scale-[0.98]"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={768}
                height={768}
                className="aspect-square w-full bg-secondary object-cover"
              />
              <div className="p-3">
                <p className="truncate text-sm font-bold">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">{p.unit}</p>
                <p className="mt-1 truncate text-xs text-muted-foreground">{p.supplier}</p>
                <div className="mt-1.5">
                  <Stars rating={p.supplierRating} />
                </div>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-base font-extrabold text-primary">
                      {soles(p.refPrice)}
                    </p>
                    <p className="text-[11px] text-muted-foreground line-through">
                      {soles(p.marketPrice)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary-soft px-2 py-1 text-[10px] font-bold text-primary">
                    mín. {p.minQty}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {list.length === 0 && (
          <div className="card-surface p-6 text-center">
            <p className="font-bold">No encontramos ese insumo</p>
            <Link to="/solicitar" className="mt-2 inline-block text-sm font-bold text-primary">
              Solicitar producto no disponible
            </Link>
          </div>
        )}
      </div>
    </AppShell>
  );
}
