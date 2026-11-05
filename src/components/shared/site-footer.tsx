import { InquiryTrigger } from "@/modules/inquiry/components/inquiry-trigger";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-grid" data-reveal="up">
        <div>
          <div className="footer-brand">ALLEGRO.</div>
          <p>Penyewaan perlengkapan untuk camping, pendakian, dan penelusuran gua.</p>
        </div>
        <div>
          <h4>MENU</h4>
          <a href="#products">Perlengkapan</a>
          <a href="#activities">Kategori</a>
          <a href="#cara-sewa">Cara Sewa</a>
        </div>
        <div>
          <h4>ALLEGRO</h4>
          <a href="#tentang">Tentang Allegro</a>
          <a href="#top">Kembali ke atas ↗</a>
        </div>
        <div className="footer-col--last">
          <h4>ADA YANG INGIN DITANYAKAN?</h4>
          <p>
            Mau tahu ketersediaan, harga, atau ketentuan sewa?
            Sampaikan perlengkapan dan tanggal yang kamu rencanakan kepada Allegro.
          </p>
          <InquiryTrigger className="button button--light">Buat pesan sewa ↗</InquiryTrigger>
        </div>
      </div>
      <div className="footer-bottom" data-reveal="up">
        <span>ALLEGRO / STUDI DESAIN</span>
        <span>Harga, produk, dan kontak belum merupakan penawaran aktual.</span>
      </div>
    </footer>
  );
}
