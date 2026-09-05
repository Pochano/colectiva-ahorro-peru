import harina from "@/assets/harina.jpg";
import azucar from "@/assets/azucar.jpg";
import chocolate from "@/assets/chocolate.jpg";
import mantequilla from "@/assets/mantequilla.jpg";
import aceite from "@/assets/aceite.jpg";

export const soles = (n: number) =>
  `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export type Tier = { min: number; price: number };

export type Product = {
  id: string;
  name: string;
  unit: string;
  category: string;
  image: string;
  supplier: string;
  supplierRating: number;
  location: string;
  minQty: number;
  refPrice: number;
  marketPrice: number;
  description: string;
  tiers: Tier[];
};

export const products: Product[] = [
  {
    id: "harina-industrial",
    name: "Harina de trigo industrial",
    unit: "saco 50 kg",
    category: "Harinas",
    image: harina,
    supplier: "Distribuidora Andina",
    supplierRating: 4.8,
    location: "Cercado, Arequipa",
    minQty: 100,
    refPrice: 128,
    marketPrice: 152,
    description:
      "Harina especial para panificación, alto contenido de gluten. Ideal para pan francés, ciabatta y masas de larga fermentación.",
    tiers: [
      { min: 1, price: 152 },
      { min: 50, price: 141 },
      { min: 100, price: 128 },
      { min: 200, price: 119 },
    ],
  },
  {
    id: "azucar-rubia",
    name: "Azúcar rubia comercial",
    unit: "saco 50 kg",
    category: "Endulzantes",
    image: azucar,
    supplier: "Distribuidora Andina",
    supplierRating: 4.8,
    location: "Cercado, Arequipa",
    minQty: 60,
    refPrice: 168,
    marketPrice: 195,
    description:
      "Azúcar rubia de caña, grano uniforme. Para repostería, panadería y bebidas.",
    tiers: [
      { min: 1, price: 195 },
      { min: 30, price: 182 },
      { min: 60, price: 168 },
      { min: 120, price: 159 },
    ],
  },
  {
    id: "chocolate-cobertura",
    name: "Chocolate cobertura 60%",
    unit: "caja 10 kg",
    category: "Repostería",
    image: chocolate,
    supplier: "Cacao Sur Perú",
    supplierRating: 4.6,
    location: "José L. Bustamante, Arequipa",
    minQty: 40,
    refPrice: 310,
    marketPrice: 368,
    description:
      "Cobertura de cacao peruano al 60%, ideal para bañados, ganache y bombonería.",
    tiers: [
      { min: 1, price: 368 },
      { min: 20, price: 340 },
      { min: 40, price: 310 },
      { min: 80, price: 295 },
    ],
  },
  {
    id: "margarina-horneo",
    name: "Margarina para horneo",
    unit: "caja 10 kg",
    category: "Grasas",
    image: mantequilla,
    supplier: "Alimentos Misti",
    supplierRating: 4.3,
    location: "Cerro Colorado, Arequipa",
    minQty: 50,
    refPrice: 142,
    marketPrice: 165,
    description:
      "Margarina con 80% de materia grasa, plasticidad estable para hojaldres y bizcochos.",
    tiers: [
      { min: 1, price: 165 },
      { min: 25, price: 154 },
      { min: 50, price: 142 },
      { min: 100, price: 134 },
    ],
  },
  {
    id: "aceite-vegetal",
    name: "Aceite vegetal 5 L",
    unit: "bidón 5 L",
    category: "Grasas",
    image: aceite,
    supplier: "Distribuidora Andina",
    supplierRating: 4.8,
    location: "Cercado, Arequipa",
    minQty: 80,
    refPrice: 38,
    marketPrice: 46,
    description:
      "Aceite vegetal de soya refinado, apto para freído profundo y masas.",
    tiers: [
      { min: 1, price: 46 },
      { min: 40, price: 42 },
      { min: 80, price: 38 },
      { min: 160, price: 35 },
    ],
  },
];

export type Participant = { mype: string; qty: number; tipo: string };

export type Campaign = {
  id: string;
  productId: string;
  title: string;
  committed: number;
  goal: number;
  currentPrice: number;
  bestPrice: number;
  closesIn: string;
  participants: Participant[];
  joined: boolean;
  myQty?: number;
  zone?: string;
  isLocal?: boolean;
};

export type SuggestedCampaign = {
  productId: string;
  title: string;
  goal: number;
  closesInDays: number;
  zone: string;
  confidence: number;
  predictedDemand: number;
  interestedMype: number;
  reason: string;
};

export const suggestedCampaigns: SuggestedCampaign[] = [
  {
    productId: "harina-industrial",
    title: "Harina de trigo — reposición quincenal",
    goal: 120,
    closesInDays: 6,
    zone: "Cercado y Yanahuara, Arequipa",
    confidence: 92,
    predictedDemand: 118,
    interestedMype: 11,
    reason:
      "9 panaderías repiten este insumo cada 14 días y su última compra fue hace 12. La demanda se concentra el fin de semana.",
  },
  {
    productId: "aceite-vegetal",
    title: "Aceite vegetal — campaña de restaurantes",
    goal: 160,
    closesInDays: 8,
    zone: "Arequipa metropolitana",
    confidence: 78,
    predictedDemand: 143,
    interestedMype: 8,
    reason:
      "Los restaurantes del sur subieron 22% su consumo en agosto y aún no hay campaña abierta de aceite.",
  },
  {
    productId: "chocolate-cobertura",
    title: "Chocolate cobertura — pre campaña de fiestas",
    goal: 80,
    closesInDays: 10,
    zone: "José L. Bustamante, Arequipa",
    confidence: 64,
    predictedDemand: 61,
    interestedMype: 6,
    reason:
      "Las pastelerías adelantan compras de cobertura 6 semanas antes de fiestas; el año pasado la demanda se duplicó.",
  },
];


export const campaigns: Campaign[] = [
  {
    id: "harina-set",
    productId: "harina-industrial",
    title: "Harina de trigo — cierre de mes",
    committed: 85,
    goal: 100,
    currentPrice: 141,
    bestPrice: 128,
    closesIn: "2 días",
    joined: true,
    myQty: 12,
    participants: [
      { mype: "Pastelería Dulce Sur", qty: 12, tipo: "Pastelería" },
      { mype: "Panadería Arequipeña", qty: 30, tipo: "Panadería" },
      { mype: "Cafetería Misti", qty: 8, tipo: "Cafetería" },
      { mype: "Panificadora El Chasqui", qty: 20, tipo: "Panadería" },
      { mype: "Bodega Santa Marta", qty: 15, tipo: "Bodega" },
    ],
  },
  {
    id: "azucar-set",
    productId: "azucar-rubia",
    title: "Azúcar rubia — campaña quincenal",
    committed: 30,
    goal: 60,
    currentPrice: 182,
    bestPrice: 168,
    closesIn: "5 días",
    joined: true,
    myQty: 6,
    participants: [
      { mype: "Pastelería Dulce Sur", qty: 6, tipo: "Pastelería" },
      { mype: "Cafetería Misti", qty: 4, tipo: "Cafetería" },
      { mype: "Restaurante Sol de Yanahuara", qty: 12, tipo: "Restaurante" },
      { mype: "Panadería Arequipeña", qty: 8, tipo: "Panadería" },
    ],
  },
  {
    id: "chocolate-set",
    productId: "chocolate-cobertura",
    title: "Chocolate cobertura — nueva campaña",
    committed: 8,
    goal: 40,
    currentPrice: 368,
    bestPrice: 310,
    closesIn: "9 días",
    joined: false,
    participants: [
      { mype: "Pastelería Dulce Sur", qty: 5, tipo: "Pastelería" },
      { mype: "Cafetería Misti", qty: 3, tipo: "Cafetería" },
    ],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCampaign = (id: string) => campaigns.find((c) => c.id === id);
export const campaignProduct = (c: Campaign) => getProduct(c.productId)!;

export const priceForQty = (tiers: Tier[], qty: number) =>
  [...tiers].reverse().find((t) => qty >= t.min)?.price ?? tiers[0].price;

export type Order = {
  id: string;
  product: string;
  qty: number;
  unitPrice: number;
  total: number;
  status: "Pendiente" | "Confirmado" | "En camino" | "Entregado";
  date: string;
  campaign: string;
};

export const orders: Order[] = [
  {
    id: "PED-1042",
    product: "Harina de trigo industrial",
    qty: 12,
    unitPrice: 141,
    total: 1692,
    status: "Pendiente",
    date: "04 Sep 2026",
    campaign: "Harina de trigo — cierre de mes",
  },
  {
    id: "PED-1038",
    product: "Azúcar rubia comercial",
    qty: 6,
    unitPrice: 182,
    total: 1092,
    status: "Confirmado",
    date: "01 Sep 2026",
    campaign: "Azúcar rubia — campaña quincenal",
  },
  {
    id: "PED-1021",
    product: "Margarina para horneo",
    qty: 8,
    unitPrice: 142,
    total: 1136,
    status: "En camino",
    date: "26 Ago 2026",
    campaign: "Margarina — agosto",
  },
  {
    id: "PED-0998",
    product: "Aceite vegetal 5 L",
    qty: 20,
    unitPrice: 38,
    total: 760,
    status: "Entregado",
    date: "12 Ago 2026",
    campaign: "Aceite — agosto",
  },
  {
    id: "PED-0975",
    product: "Harina de trigo industrial",
    qty: 10,
    unitPrice: 128,
    total: 1280,
    status: "Entregado",
    date: "30 Jul 2026",
    campaign: "Harina — julio",
  },
];

export const notifications = [
  {
    id: 1,
    title: "¡Faltan 15 sacos!",
    body: "La campaña de Harina de trigo está al 85%. Súmate antes del cierre.",
    time: "hace 20 min",
    unread: true,
  },
  {
    id: 2,
    title: "Precio desbloqueado",
    body: "Azúcar rubia bajó a S/ 182 por saco al superar 30 unidades.",
    time: "hace 3 h",
    unread: true,
  },
  {
    id: 3,
    title: "Pedido en camino",
    body: "PED-1021 sale de almacén de Alimentos Misti hoy.",
    time: "ayer",
    unread: false,
  },
  {
    id: 4,
    title: "Nueva campaña sugerida",
    body: "Chocolate cobertura 60% — compras este producto cada mes.",
    time: "hace 2 días",
    unread: false,
  },
];

export const frequentProducts = ["harina-industrial", "azucar-rubia", "margarina-horneo"];

export const categories = ["Todas", "Harinas", "Endulzantes", "Repostería", "Grasas"];

export const suppliers = [
  {
    name: "Distribuidora Andina",
    rating: 4.8,
    reviews: 126,
    location: "Cercado, Arequipa",
    campaigns: 3,
  },
  { name: "Cacao Sur Perú", rating: 4.6, reviews: 74, location: "JLByR, Arequipa", campaigns: 1 },
  { name: "Alimentos Misti", rating: 4.3, reviews: 58, location: "Cerro Colorado", campaigns: 2 },
];

export const currentMype = {
  name: "Pastelería Dulce Sur",
  tipo: "Pastelería",
  location: "Yanahuara, Arequipa",
  savings: 2480,
};
