"use client";

import {
  createContext, useCallback, useContext, useRef, useState,
  type FormEvent, type ReactNode,
} from "react";
import { products, type ProductId } from "@/modules/catalog/data/products";
import { siteConfig } from "@/config/site";
import { buildInquiryMessage, buildWhatsAppUrl } from "../lib/build-inquiry-message";

type InquiryContextValue = { openInquiry: (productId?: ProductId) => void };
const InquiryContext = createContext<InquiryContextValue | null>(null);

export function useInquiry(): InquiryContextValue {
  const value = useContext(InquiryContext);
  if (!value) throw new Error("useInquiry must be used inside InquiryProvider");
  return value;
}

export function InquiryProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [selectedProductId, setSelectedProductId] = useState<ProductId>(products[0].id);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const openInquiry = useCallback((productId?: ProductId) => {
    setSelectedProductId(productId ?? products[0].id);
    setStatus("");
    setMessage("");
    const today = new Date();
    const localDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");
    if (dateInputRef.current) dateInputRef.current.min = localDate;
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }, []);

  const closeInquiry = () => dialogRef.current?.close();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    let result: string;
    try {
      result = buildInquiryMessage({
        productId: selectedProductId,
        startDate: String(form.get("startDate") ?? ""),
        rentalDays: Number(form.get("rentalDays")),
      });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Data sewa tidak valid.");
      return;
    }

    setMessage(result);
    const url = buildWhatsAppUrl(siteConfig.whatsappNumber, result);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("Pesan disiapkan. Jika WhatsApp tidak terbuka, salin pesan di bawah.");
      return;
    }

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(result);
      setStatus("Pesan berhasil disalin. Kirimkan ke kontak resmi Allegro.");
    } catch {
      setStatus("Penyalinan otomatis tidak tersedia. Silakan salin pesan pada kolom di bawah.");
    }
  }

  return (
    <InquiryContext.Provider value={{ openInquiry }}>
      {children}
      <dialog ref={dialogRef} aria-labelledby="inquiry-title" aria-describedby="inquiry-description" onClose={() => { setStatus(""); setMessage(""); }}>
        <div className="dialog-top">
          <span className="micro">FORMULIR PERTANYAAN SEWA</span>
          <button type="button" aria-label="Tutup formulir" onClick={closeInquiry}>×</button>
        </div>
        <h2 id="inquiry-title">Siapkan pesan penyewaan</h2>
        <p id="inquiry-description">Pilih alat dan waktu sewa. Pesan bisa disalin atau dikirim ke WhatsApp jika kontak resmi telah tersedia.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="inquiry-product">Perlengkapan</label>
          <select id="inquiry-product" required value={selectedProductId} onChange={(event) => setSelectedProductId(event.target.value as ProductId)}>
            {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
          </select>
          <label htmlFor="inquiry-date">Tanggal mulai</label>
          <input ref={dateInputRef} id="inquiry-date" name="startDate" type="date" required />
          <label htmlFor="inquiry-days">Lama sewa (hari)</label>
          <input id="inquiry-days" name="rentalDays" type="number" min="1" max="60" defaultValue="2" required />
          <button className="button" type="submit">Siapkan pesan ↗</button>
          <p className="dialog-status" role="status" aria-live="polite">{status}</p>
          {message && <label htmlFor="inquiry-message">Pesan untuk dikirim
            <textarea id="inquiry-message" readOnly rows={7} value={message} onFocus={(event) => event.target.select()} />
          </label>}
        </form>
        <div className="dialog-alert">Prototype: harga di halaman masih ilustrasi. Form ini tidak mengecek stok atau membuat reservasi otomatis.</div>
      </dialog>
    </InquiryContext.Provider>
  );
}
