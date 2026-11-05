export const siteConfig = {
  name: "ALLEGRO",
  description: "Penyewaan perlengkapan untuk camping, pendakian, dan penelusuran gua.",
  whatsappNumber: process.env.NEXT_PUBLIC_ALLEGRO_WHATSAPP ?? "",
} as const;
