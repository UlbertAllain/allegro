import { RentalJourney } from "./rental-journey";

const rentalSteps = [
  {
    number: "01",
    title: "Pilih perlengkapan",
    description: "Lihat pilihan alat dan informasi yang sesuai dengan kegiatanmu.",
  },
  {
    number: "02",
    title: "Tentukan waktu sewa",
    description: "Sampaikan tanggal pemakaian dan berapa lama alat diperlukan.",
  },
  {
    number: "03",
    title: "Konfirmasi dengan Allegro",
    description: "Pastikan ketersediaan, biaya, kelengkapan, dan cara pengambilan.",
  },
] as const;

export function RentalStepsSection() {
  return (
    <section className="process process--editorial" id="cara-sewa" aria-labelledby="process-title">
      <div className="process-framing" data-reveal="up">
        <span className="micro eyebrow">03 / CARA SEWA</span>
        <div className="process-intro">
          <h2 className="section-title" id="process-title">Begini cara<br />menyewanya.</h2>
          <p>
            Setelah menemukan perlengkapan yang cocok, tentukan waktu sewa.
            Detail ketersediaan dan pengambilannya bisa dikonfirmasi bersama Allegro.
          </p>
        </div>
      </div>

      <RentalJourney steps={rentalSteps} />
    </section>
  );
}
