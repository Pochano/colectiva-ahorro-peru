import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { campaigns as seedCampaigns, getProduct, priceForQty, type Campaign } from "@/lib/mock-data";

const STORAGE_KEY = "juntas-campaigns-v1";

export type NewCampaignInput = {
  productId: string;
  title: string;
  goal: number;
  closesInDays: number;
  zone: string;
};

type Ctx = {
  campaigns: Campaign[];
  addCampaign: (input: NewCampaignInput) => Campaign;
  removeCampaign: (id: string) => void;
  resetCampaigns: () => void;
};

const CampaignsContext = createContext<Ctx | null>(null);

function buildCampaign(input: NewCampaignInput): Campaign {
  const product = getProduct(input.productId) ?? null;
  const goal = Math.max(1, Math.round(input.goal || 0));
  const committed = Math.max(1, Math.round(goal * 0.15));
  const tiers = product?.tiers ?? [{ min: 1, price: 100 }];
  return {
    id: `local-${Date.now()}`,
    productId: product?.id ?? "harina-industrial",
    title: input.title.trim() || `${product?.name ?? "Insumo"} — nueva campaña`,
    committed,
    goal,
    currentPrice: priceForQty(tiers, committed),
    bestPrice: priceForQty(tiers, goal),
    closesIn: `${Math.max(1, Math.round(input.closesInDays || 7))} días`,
    joined: false,
    participants: [
      { mype: "Panadería Arequipeña", qty: Math.max(1, Math.round(committed * 0.6)), tipo: "Panadería" },
      { mype: "Cafetería Misti", qty: Math.max(1, committed - Math.round(committed * 0.6)), tipo: "Cafetería" },
    ],
    zone: input.zone.trim() || "Arequipa metropolitana",
    isLocal: true,
  };
}

export function CampaignsProvider({ children }: { children: ReactNode }) {
  const [local, setLocal] = useState<Campaign[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLocal(JSON.parse(raw) as Campaign[]);
    } catch {
      /* demo local */
    }
  }, []);

  const persist = useCallback((next: Campaign[]) => {
    setLocal(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* demo local */
    }
  }, []);

  const addCampaign = useCallback(
    (input: NewCampaignInput) => {
      const created = buildCampaign(input);
      persist([created, ...local]);
      return created;
    },
    [local, persist],
  );

  const removeCampaign = useCallback((id: string) => persist(local.filter((c) => c.id !== id)), [local, persist]);
  const resetCampaigns = useCallback(() => persist([]), [persist]);

  const value = useMemo<Ctx>(
    () => ({ campaigns: [...local, ...seedCampaigns], addCampaign, removeCampaign, resetCampaigns }),
    [local, addCampaign, removeCampaign, resetCampaigns],
  );

  return <CampaignsContext.Provider value={value}>{children}</CampaignsContext.Provider>;
}

export function useCampaigns() {
  const ctx = useContext(CampaignsContext);
  if (!ctx) return { campaigns: seedCampaigns, addCampaign: () => seedCampaigns[0], removeCampaign: () => {}, resetCampaigns: () => {} } as Ctx;
  return ctx;
}

export function useCampaignById(id: string) {
  const { campaigns } = useCampaigns();
  return campaigns.find((c) => c.id === id);
}
