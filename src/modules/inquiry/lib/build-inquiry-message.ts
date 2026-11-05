import { products, type ProductId } from "@/modules/catalog/data/products";

export interface InquiryInput {
  productId: ProductId;
  startDate: string;
  rentalDays: number;
}

/** Returns a business-ready text; never guesses prices or stock availability. */
export function buildInquiryMessage(input: InquiryInput): string {
  const product = products.find((item) => item.id === input.productId);
  if (!product) throw new Error("Pilih perlengkapan yang tersedia.");

  const { startDate, rentalDays } = input;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    throw new Error("Tanggal mulai harus diisi.");
  }

  const date = new Date(`${startDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== startDate) {
    throw new Error("Tanggal mulai tidak valid.");
  }
  if (!Number.isInteger(rentalDays) || rentalDays < 1 || rentalDays > 60) {
    throw new Error("Lama sewa harus antara 1 sampai 60 hari.");
  }

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(date);

  return [
    "Halo Allegro, saya mau tanya ketersediaan perlengkapan:",
    `- Perlengkapan: ${product.name}`,
    `- Mulai sewa: ${formattedDate}`,
    `- Lama sewa: ${rentalDays} hari`,
    "", "Boleh diinformasikan stok, total biaya, dan cara pengambilannya? Terima kasih.",
  ].join("\n");
}

export function buildWhatsAppUrl(phone: string, message: string): string | null {
  // Only a validated Indonesian/international contact may be used for external navigation.
  const normalized = phone.replace(/[\s+()-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(normalized)) return null;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
