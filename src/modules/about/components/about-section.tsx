import Image from "next/image";
import { AboutDetails } from "./about-details";

export function AboutSection() {
  return (
    <section className="about" id="tentang" aria-labelledby="about-title">
      <div className="about-top" data-reveal="up">
        <div>
          <span className="micro eyebrow">04 / DI BALIK ALLEGRO</span>
          <h2 className="section-title" id="about-title">Sebelum alat<br />berpindah tangan.</h2>
        </div>
        <span className="side">DARI<br />RUANG PERLENGKAPAN</span>
      </div>
      <figure className="about-photo" data-reveal="morph">
        <Image src="/images/equipment-check.webp" alt="Staf memeriksa carrier di ruang perlengkapan" width={1672} height={941} sizes="100vw" />
      </figure>
      <AboutDetails />
    </section>
  );
}
