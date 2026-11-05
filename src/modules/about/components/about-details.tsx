"use client";

import { useState } from "react";

export function AboutDetails() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="about-bottom" data-reveal="up">
        <p>
          Setelah kembali dari satu perjalanan, alat perlu diperiksa sebelum digunakan orang berikutnya.
          Di Allegro, persiapannya mencakup pengecekan kondisi dan kelengkapan, termasuk informasi
          yang perlu diketahui penyewa.
        </p>
        <button
          type="button"
          className="about-more-trigger"
          aria-controls="about-more"
          aria-expanded={expanded}
          onClick={() => setExpanded((previous) => !previous)}
        >
          {expanded ? "Tutup cerita ↑" : "Kenali Allegro ↗"}
        </button>
      </div>
      <div className="about-more" id="about-more" hidden={!expanded}>
        Allegro berangkat dari kebutuhan sederhana: tempat menyewa perlengkapan yang juga bisa
        diajak bicara soal rencana kegiatan. Kami ingin setiap penyewa bisa memahami ukuran,
        spesifikasi, dan kondisi perlengkapan sebelum menentukan pilihannya.
      </div>
    </>
  );
}
