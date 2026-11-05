import Image from "next/image";
import { SiteHeader } from "@/components/shared/site-header";

const activityLinks = [
  { label: "Camping", href: "#product-camping" },
  { label: "Pendakian", href: "#product-hiking" },
  { label: "Caving", href: "#product-caving" },
] as const;

export function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <SiteHeader />

      <div className="hero-stage">
        <p className="hero-label">SEWA<br />PERLENGKAPAN<br />OUTDOOR</p>

        <h1 className="hero-wordmark" id="hero-title">ALLEGRO</h1>

        <div className="hero-person">
          <Image
            src="/images/hero-hiker-transparent.png"
            alt="Pendaki membawa carrier oranye, dilihat dari belakang"
            width={1024}
            height={1536}
            priority
            sizes="(max-width: 700px) 68vw, (max-width: 1100px) 36vw, 390px"
          />
        </div>

        <div className="hero-bottom">
          <div className="hero-copy">
            <p>
              Carrier buat mendaki, tenda buat camping, sampai helm untuk caving.
              Pilih alatnya, lalu cek stok untuk tanggal sewamu.
            </p>
            <div className="hero-actions">
              <a className="button" href="#products">Lihat Perlengkapan <span aria-hidden="true">↗</span></a>
              <a className="hero-secondary-link" href="#cara-sewa">Cara Sewa <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <a className="hero-about-link" href="#tentang">
            <span className="hero-about-link__icon" aria-hidden="true">↗</span>
            <span>Kenali Allegro</span>
          </a>
        </div>
      </div>

      <nav className="hero-categories" aria-label="Cari perlengkapan berdasarkan kegiatan">
        <span className="hero-categories__label">CARI BERDASARKAN KEGIATAN</span>
        {activityLinks.map((activity) => (
          <a key={activity.href} href={activity.href}>
            <span>{activity.label}</span>
            <span className="hero-categories__arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </section>
  );
}
