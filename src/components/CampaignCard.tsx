import { Link } from "@tanstack/react-router";
import { Clock, TrendingDown } from "lucide-react";

import { CampaignProgress } from "@/components/CampaignProgress";
import { campaignProduct, soles, type Campaign } from "@/lib/mock-data";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const product = campaignProduct(campaign);
  const save = product.marketPrice - campaign.bestPrice;

  return (
    <Link
      to="/campanas/$campaignId"
      params={{ campaignId: campaign.id }}
      className="card-surface block p-4 transition-transform active:scale-[0.99]"
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="size-14 shrink-0 rounded-2xl bg-secondary object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-bold">{product.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {product.supplier} · {product.unit}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <CampaignProgress committed={campaign.committed} goal={campaign.goal} unit={"unid."} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-1 font-semibold text-primary">
          <TrendingDown className="size-3.5" /> Ahorras {soles(save)}/{product.unit.split(" ")[0]}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 font-medium text-muted-foreground">
          <Clock className="size-3.5" /> Cierra en {campaign.closesIn}
        </span>
        {campaign.joined && (
          <span className="rounded-full bg-trust-soft px-2 py-1 font-semibold text-trust">
            Participas con {campaign.myQty}
          </span>
        )}
      </div>
    </Link>
  );
}
