import { ScrollMorphImage } from "./scroll-morph-image";

export function ActivitiesSection() {
  return (
    <section className="activities" id="activities" aria-labelledby="activities-title">
      <div className="activities-header" data-reveal="up">
        <div>
          <span className="micro eyebrow">02 / JELAJAHI KATEGORI</span>
          <h2 className="section-title" id="activities-title">
            Pilih berdasarkan kegiatan.
          </h2>
        </div>
        <p>
          Kebutuhan camping tentu berbeda dengan pendakian atau caving.
          Perlengkapan Allegro dikelompokkan berdasarkan kegiatan yang akan kamu lakukan.
        </p>
      </div>

      <div className="activities-layout">
        <a className="category-feature category-feature--scroll-morph" href="#product-camping">
          <div className="category-feature__media">
            <ScrollMorphImage
              src="/images/camping-scene.webp"
              alt="Tenda camping di area pegunungan"
              width={1448}
              height={1086}
            />
          </div>
          <div className="category-inner">
            <small>01 / CAMPING</small>
            <h3>Camping</h3>
            <p>Tenda, matras, peralatan memasak, dan perlengkapan untuk bermalam di alam terbuka.</p>
            <span>Lihat perlengkapan camping ↗</span>
          </div>
        </a>

        <div className="category-index">
          <a className="category-row" data-reveal="right" href="#product-hiking">
            <div>
              <span className="micro">02 / PENDAKIAN</span>
              <h3>Pendakian</h3>
              <p>Carrier, trekking pole, jas hujan, dan perlengkapan untuk perjalanan mendaki.</p>
            </div>
            <span aria-hidden="true" className="round-arrow">↗</span>
          </a>
          <a className="category-row" data-reveal="right" data-delay="1" href="#product-caving">
            <div>
              <span className="micro">03 / CAVING</span>
              <h3>Caving</h3>
              <p>Helm, harness, dan perlengkapan khusus untuk kegiatan penelusuran gua.</p>
            </div>
            <span aria-hidden="true" className="round-arrow">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
