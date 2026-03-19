import type { Product } from "@/types/shop";

const buildImage = (title: string, bgColor: string, accentColor: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
      <defs>
        <linearGradient id="surface" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgColor}" />
          <stop offset="100%" stop-color="${accentColor}" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" rx="40" fill="url(#surface)" />
      <circle cx="520" cy="110" r="82" fill="rgba(255,255,255,0.18)" />
      <circle cx="118" cy="360" r="102" fill="rgba(255,255,255,0.12)" />
      <rect x="84" y="78" width="220" height="16" rx="8" fill="rgba(255,255,255,0.38)" />
      <rect x="84" y="118" width="148" height="16" rx="8" fill="rgba(255,255,255,0.22)" />
      <text
        x="84"
        y="314"
        fill="#ffffff"
        font-size="42"
        font-family="Segoe UI, Arial, sans-serif"
        font-weight="700"
      >
        ${title}
      </text>
      <text
        x="84"
        y="360"
        fill="rgba(255,255,255,0.88)"
        font-size="22"
        font-family="Segoe UI, Arial, sans-serif"
      >
        LETRON SELECT
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const products: Product[] = [
  {
    id: 101,
    title: "Aurora Desk Lamp",
    price: 1280,
    image: buildImage("Aurora Desk Lamp", "#263b72", "#f18f6a"),
    description:
      "A focused desk lamp with warm diffusion for late-night study sessions.",
  },
  {
    id: 102,
    title: "Fold Brew Kit",
    price: 980,
    image: buildImage("Fold Brew Kit", "#235347", "#f6c667"),
    description:
      "Compact pour-over set designed for quick setup and easy packing.",
  },
  {
    id: 103,
    title: "Canvas Weekender",
    price: 2240,
    image: buildImage("Canvas Weekender", "#6a334f", "#f3a9c3"),
    description:
      "Structured overnight bag with reinforced handles and a flexible divider.",
  },
  {
    id: 104,
    title: "Stone Bottle",
    price: 760,
    image: buildImage("Stone Bottle", "#315b66", "#97d0cf"),
    description:
      "Double-wall insulated bottle that keeps drinks cold through long commutes.",
  },
  {
    id: 105,
    title: "Quiet Keys",
    price: 1890,
    image: buildImage("Quiet Keys", "#5b4125", "#f2b36d"),
    description:
      "Low-profile mechanical keyboard with a muted tactile switch profile.",
  },
  {
    id: 106,
    title: "Soft Grid Throw",
    price: 1460,
    image: buildImage("Soft Grid Throw", "#3d3a64", "#8bb8ff"),
    description:
      "Breathable woven blanket with subtle geometric texture for lounge spaces.",
  },
];
