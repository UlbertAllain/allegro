"use client";

import { useState } from "react";
import { InquiryTrigger } from "@/modules/inquiry/components/inquiry-trigger";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="ALLEGRO, kembali ke atas" onClick={closeMenu}>
        <span aria-hidden="true" className="brand-mark" /> ALLEGRO
      </a>
      <span className="tagline">RENTAL<br />OUTDOOR EQUIPMENT</span>
      <nav className={`navitems ${menuOpen ? "navitems--open" : ""}`} aria-label="Navigasi utama" id="main-navigation">
        <div className="nav-dropdown">
          <a href="#products" onClick={closeMenu}>Perlengkapan <span aria-hidden="true">⌄</span></a>
          <div className="drop-menu">
            <a href="#products" onClick={closeMenu}>Semua produk</a>
            <a href="#activities" onClick={closeMenu}>Kategori aktivitas</a>
            <a href="#product-hiking" onClick={closeMenu}>Pendakian</a>
            <a href="#product-camping" onClick={closeMenu}>Camping</a>
            <a href="#product-caving" onClick={closeMenu}>Caving</a>
          </div>
        </div>
        <a href="#cara-sewa" onClick={closeMenu}>Cara Sewa</a>
        <a href="#tentang" onClick={closeMenu}>Tentang</a>
      </nav>
      <InquiryTrigger className="nav-action">Tanya Stok ↗</InquiryTrigger>
      <button type="button" className="menu-toggle" aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
    </header>
  );
}
