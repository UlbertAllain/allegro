export const products = [
  {
    id: "carrier",
    category: "hiking",
    label: "CARRIER / PENDAKIAN",
    name: "Carrier 65 L",
    detail: "Kapasitas 65 liter",
    price: "Rp 75.000",
    image: "/images/carrier-65l.webp",
    imageAlt: "Carrier pendakian 65 liter",
    width: 1448,
    height: 1086,
  },
  {
    id: "tent",
    category: "camping",
    label: "CAMPING",
    name: "Tenda dome 2P",
    detail: "Untuk 2 orang",
    price: "Rp 60.000",
    image: "/images/tent-dome.webp",
    imageAlt: "Tenda dome untuk dua orang",
    width: 1672,
    height: 941,
  },
  {
    id: "helmet",
    category: "caving",
    label: "CAVING",
    name: "Helm caving",
    detail: "Ukuran perlu dikonfirmasi",
    price: "Rp 35.000",
    image: "/images/caving-helmet.webp",
    imageAlt: "Helm keselamatan penelusuran gua",
    width: 1672,
    height: 941,
  },
] as const;

export type Product = (typeof products)[number];
export type ProductId = Product["id"];
