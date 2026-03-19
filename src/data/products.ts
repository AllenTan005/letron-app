import type { Product } from "@/types/shop";
import hamburger from "@/assets/hamburger.svg";
import sushi from "@/assets/sushi.svg";
import friedChicken from "@/assets/fried-chicken.svg";
import ramen from "@/assets/ramen.svg";
import friedRice from "@/assets/fried-rice.svg";





export const products: Product[] = [
  {
    id: 101,
    title: "經典牛肉漢堡",
    price: 90,
    image: hamburger,
    description:
      "厚實牛肉排搭配切達起司、生菜、番茄與特製醬料，口感飽滿有層次。",
  },
  {
    id: 102,
    title: "魚蛋壽司",
    price: 30,
    image: sushi,
    description:
      "新鮮魚蛋搭配米飯芥末與薑片，入口清爽，帶出細緻鮮味。",
  },
  {
    id: 103,
    title: "酥脆炸雞",
    price: 70,
    image: friedChicken,
    description:
      "外皮炸得金黃酥脆，肉質依然多汁，每一口都帶有濃郁鹹香。",
  },
  {
    id: 104,
    title: "豚骨拉麵",
    price: 220,
    image: ramen,
    description:
      "濃郁豚骨湯底配上叉燒、溏心蛋與蔥花，湯頭醇厚、香氣十足。",
  },
  {
    id: 105,
    title: "蒜香炒飯",
    price: 100,
    image: friedRice,
    description:
      "粒粒分明的炒飯融合蒜香與蔥香，帶有剛好的鍋氣與鹹香風味。",
  },

];
