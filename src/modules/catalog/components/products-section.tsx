import Image from "next/image";
import { InquiryTrigger } from "@/modules/inquiry/components/inquiry-trigger";
import { products, type Product } from "../data/products";

interface ProductProps {
  product: Product;
}

function FeaturedProduct({ product }: ProductProps) {
  return (
    <div id={`product-${product.category}`} data-reveal="up">
      <InquiryTrigger
        className="product product-main"
        productId={product.id}
        aria-label={`Tanyakan ketersediaan ${product.name}`}
      >
        <span className="product-image">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={product.width}
            height={product.height}
            sizes="(max-width: 700px) 100vw, 40vw"
          />
        </span>
        <span className="product-text">
          <span>
            <span className="category-label">{product.label}</span>
            <span className="product-name block">{product.name}</span>
            <span className="product-meta">{product.detail}</span>
            <span className="product-price block mt-[18px]">
              {product.price} <span>/ hari*</span>
            </span>
          </span>
          <span className="product-arrow" aria-hidden="true">↗</span>
        </span>
      </InquiryTrigger>
    </div>
  );
}

function CompactProduct({ product }: ProductProps) {
  return (
    <div id={`product-${product.category}`} data-reveal="right">
      <InquiryTrigger
        className="product product-small"
        productId={product.id}
        aria-label={`Tanyakan ketersediaan ${product.name}`}
      >
        <span className="product-image">
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={product.width}
            height={product.height}
            sizes="132px"
          />
        </span>
        <span>
          <span className="micro">{product.label}</span>
          <span className="product-name block">{product.name}</span>
          <span className="product-meta">{product.detail}</span>
          <span className="product-price">
            {product.price} <span>/ hari*</span>
          </span>
        </span>
      </InquiryTrigger>
    </div>
  );
}

export function ProductsSection() {
  const [featured, ...others] = products;

  return (
    <section className="products" id="products" aria-labelledby="products-title">
      <div className="section-topline" data-reveal="up">
        <span className="micro eyebrow">01 / PERLENGKAPAN PILIHAN</span>
        <span className="micro">KATALOG ALLEGRO</span>
      </div>

      <div className="products-layout">
        <div className="product-intro" data-reveal="left">
          <h2 className="section-title" id="products-title">
            Perlengkapan pilihan untuk perjalananmu.
          </h2>
          <p>
            Carrier untuk pendakian, tenda untuk bermalam, sampai helm untuk
            penelusuran gua. Kenali ukuran dan detail setiap perlengkapan sebelum menyewa.
          </p>
          <a className="text-link" href="#activities">
            Jelajahi berdasarkan kegiatan <span aria-hidden="true">↗</span>
          </a>
        </div>

        <FeaturedProduct product={featured} />
        <div className="product-side">
          {others.map((product) => (
            <CompactProduct key={product.id} product={product} />
          ))}
        </div>
      </div>

      <p className="product-note">
        Harga dan foto produk adalah contoh untuk studi desain, bukan daftar sewa aktif.
      </p>
    </section>
  );
}
