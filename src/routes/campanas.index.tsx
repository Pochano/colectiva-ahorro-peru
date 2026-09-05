import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { CampaignCard } from "@/components/CampaignCard";
import { SectionTitle } from "@/components/ui-bits";
import { useCampaigns } from "@/lib/campaign-store";

export const Route = createFileRoute("/campanas/")({
  head: () => ({
    meta: [
      { title: "Campañas colectivas activas — Mayora" },
      {
        name: "description",
        content:
          "Campañas de compra colectiva abiertas en Arequipa: harina, azúcar y chocolate con precio mayorista al alcanzar la meta.",
      },
      { property: "og:title", content: "Campañas colectivas activas — Mayora" },
      {
        property: "og:description",
        content: "Súmate a una campaña y desbloquea el precio de mayoreo.",
      },
    ],
  }),
  component: CampaignList,
});

function CampaignList() {
  const { campaigns } = useCampaigns();

  return (
    <AppShell title="Campañas colectivas" subtitle="Arequipa · cierran esta semana">
      <SectionTitle>Cerca de la meta</SectionTitle>
      <div className="grid gap-3 md:grid-cols-2">
        {campaigns
          .filter((c) => c.committed / c.goal >= 0.7)
          .map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
      </div>

      <div className="mt-8">
        <SectionTitle>Sumando volumen</SectionTitle>
        <div className="grid gap-3 md:grid-cols-2">
          {campaigns
            .filter((c) => c.committed / c.goal < 0.7)
            .map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
        </div>
      </div>
    </AppShell>
  );
}
