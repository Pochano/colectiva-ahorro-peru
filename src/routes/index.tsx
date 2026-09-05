import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, HandCoins, PiggyBank, ShieldCheck, Sprout, Users } from "lucide-react";

import { CampaignCard } from "@/components/CampaignCard";
import { SectionTitle, Stars } from "@/components/ui-bits";
import hero from "@/assets/hero.jpg";
import { campaigns, suppliers } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Juntas — Compras colectivas para MYPE en Arequipa" },
      {
        name: "description",
        content:
          "Une tu pedido con otras panaderías, pastelerías y cafeterías de Arequipa y accede a precios de mayoreo en harina, azúcar, chocolate y aceite.",
      },
      { property: "og:title", content: "Juntas — Compras colectivas para MYPE" },
      {
        property: "og:description",
        content: "Compra en grupo, paga precio de mayorista. Marketplace B2B para MYPE peruanas.",
      },
    ],
  }),
  component: Landing,
});

const steps = [
  {
    icon: Users,
    title: "Únete a una campaña",
    body: "Elige el insumo que ya compras y di cuánto necesitas este mes.",
  },
  {
    icon: HandCoins,
    title: "Sumamos volumen",
    body: "Varias MYPE juntan pedidos hasta llegar al mínimo del proveedor.",
  },
  {
    icon: PiggyBank,
    title: "Todos pagan menos",
    body: "Al alcanzar la meta, el precio mayorista se aplica a cada negocio.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl gradient-growth text-primary-foreground">
            <Sprout className="size-5" />
          </span>
          <p className="min-w-0 flex-1 truncate text-lg font-extrabold">Juntas</p>
          <Link
            to="/auth"
            className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground"
          >
            Ingresar
          </Link>
          <Link
            to="/dashboard"
            className="shrink-0 rounded-full gradient-growth px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            Empezar
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-6 md:grid md:grid-cols-2 md:items-center md:gap-10 md:pt-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent-foreground">
            Arequipa, Perú · Precios en soles
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] md:text-5xl">
            Compra como grande,
            <br />
            <span className="text-primary">aunque seas pequeño</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Los mayoristas venden desde 100 sacos y tu panadería necesita 12. Con Juntas, varias
            MYPE unen su pedido, llegan al mínimo y todas pagan precio de mayoreo.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full gradient-growth px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-lift)]"
            >
              Empezar a comprar <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/campanas"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3.5 text-sm font-bold"
            >
              Ver campañas activas
            </Link>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-3">
            {[
              ["S/ 2,480", "ahorro promedio al mes"],
              ["18%", "menos que precio de bodega"],
              ["120+", "MYPE en la red"],
            ].map(([v, l]) => (
              <div key={l} className="card-surface p-3">
                <dt className="text-xl font-extrabold text-primary">{v}</dt>
                <dd className="text-[11px] leading-tight text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-8 md:mt-0">
          <img
            src={hero}
            alt="Dueña de una panadería en Arequipa junto a su producción de pan"
            width={1280}
            height={960}
            className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <SectionTitle>El problema, resuelto en 3 pasos</SectionTitle>
        <div className="grid gap-3 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="card-surface p-5">
              <span className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                <s.icon className="size-5" />
              </span>
              <p className="mt-3 text-xs font-bold text-muted-foreground">PASO {i + 1}</p>
              <h3 className="text-base font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <SectionTitle
          action={
            <Link to="/campanas" className="shrink-0 text-sm font-bold text-primary">
              Ver todas
            </Link>
          }
        >
          Campañas activas ahora
        </SectionTitle>
        <div className="grid gap-3 md:grid-cols-3">
          {campaigns.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <SectionTitle>Proveedores verificados</SectionTitle>
        <div className="grid gap-3 md:grid-cols-3">
          {suppliers.map((s) => (
            <div key={s.name} className="card-surface flex items-center gap-3 p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-trust-soft text-trust">
                <ShieldCheck className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">{s.location}</p>
                <div className="mt-1">
                  <Stars rating={s.rating} reviews={s.reviews} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-card px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <p className="font-bold text-foreground">Juntas · Prototipo de demo</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/proveedor">Soy proveedor</Link>
            <Link to="/admin">Administración</Link>
            <Link to="/auth">Ingresar</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
