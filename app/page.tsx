import Image from "next/image";
import Link from "next/link";
import ContornoDivider from "@/components/ContornoDivider";
import ApartamentoCard from "@/components/ApartamentoCard";
import { apartamentos } from "@/app/lib/apartamentos";
import { verinImages } from "@/app/lib/verin";

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="hero">
        <div className="hero-media">
          <Image src={verinImages[0].src} alt={verinImages[0].alt} fill priority style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap hero-content">
          <p className="eyebrow">Calle Maior, 5 · Verín, Galicia</p>
          <h1>Descanso en el corazón de Verín</h1>
          <p className="lede">
            Cuatro apartamentos reformados en un edificio de la calle principal del casco histórico, con todas las comodidades y a un paso de todo lo que Verín ofrece.
          </p>
          <div className="hero-cta">
            <Link href="/apartamentos" className="btn btn--light">Ver los apartamentos</Link>
            {/* <Link href="/sobre-nosotros#contacto" className="btn btn--ghost">Cómo llegar</Link> */}
          </div>
          <div className="hero-stats">
            <div><strong>4</strong><span>Apartamentos</span></div>
            <div><strong>39–69</strong><span>m² por unidad</span></div>
            <div><strong>2</strong><span>Plantas</span></div>
          </div>
        </div>
      </section>
      <ContornoDivider />

      {/* ------------------------------------------------- Por qué Verín + Ubicación */}
      <section className="section section--stone">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">La comarca</p>
              <h2>Por qué aquí</h2>
            </div>
            <p className="lede">
              Verín, un lugar con encanto, gastronomía e historia, para disfrutar de una Galicia distinta y auténtica. Perfecto para escapadas de fin de semana, vacaciones en familia o relajarse en pareja.
            </p>
          </div>

          <div className="verin-grid">
            <div className="highlights">
              {/*<div className="highlight-item">
                <span className="mono">Castillo de Monterrei</span>
                <h3>Vigilando el valle desde el siglo XII</h3>
                <p>A quince minutos en coche, uno de los conjuntos monumentales más extensos de Galicia domina la vega desde lo alto.</p>
              </div>*/}
              <div className="highlight-item">
                <span className="mono">D.O. Monterrei</span>
                <h3>Godello, el nuevo vino de moda</h3>
                <p>Podrás observar dónde y cómo se produce este vino único.</p>
              </div>
              <div className="highlight-item">
                <span className="mono">Ruta de las Aguas</span>
                <h3>Manantiales que dan nombre a la comarca</h3>
                <p>Fuentes y balnearios conocidos en toda España para disfrutar en familia.</p>
              </div>
              <div className="highlight-item">
                <span className="mono">Calle Maior, 5</span>
                <h3>A pie de todo, sin salir del casco</h3>
                <p>Ubicado en el corazón de Verín, a solo unos pasos de todos los servicios y atracciones.</p>
                <Link href="/sobre-nosotros" className="link-arrow" style={{ marginTop: "0.9rem" }}>Cómo llegar →</Link>
              </div>
            </div>

            <div className="location-collage">
              <Link href="/sobre-nosotros#contacto">
                <Image src={verinImages[1]?.src ?? verinImages[0].src} alt={verinImages[1]?.alt ?? ""} width={300} height={300} style={{ objectFit: "cover" }} />
              </Link>
              <Link href="/sobre-nosotros#contacto">
                <Image src={verinImages[2]?.src ?? verinImages[0].src} alt={verinImages[2]?.alt ?? ""} width={300} height={300} style={{ objectFit: "cover" }} />
              </Link>
              <Link href="/sobre-nosotros#contacto">
                <Image src={verinImages[3]?.src ?? verinImages[0].src} alt={verinImages[3]?.alt ?? ""} width={300} height={300} style={{ objectFit: "cover" }} />
              </Link>
              <Link href="/sobre-nosotros#contacto">
                <Image src={verinImages[4]?.src ?? verinImages[0].src} alt={verinImages[4]?.alt ?? ""} width={300} height={300} style={{ objectFit: "cover" }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Apartamentos */}
      <section className="section section--white">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Alojamiento</p>
              <h2>Cuatro apartamentos nuevos y modernos</h2>
            </div>
            <Link href="/apartamentos" className="link-arrow">Ver todos →</Link>
          </div>
          <div className="apt-grid apt-grid--four">
            {apartamentos.map((apartamento) => (
              <ApartamentoCard key={apartamento.id} apartamento={apartamento} />
            ))}
          </div>
        </div>
      </section>

      <ContornoDivider tone="mint" flip />

      {/* ------------------------------------------------------------------- CTA */}
      <section className="section section--ink">
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Reservas</p>
          <h2 style={{ fontSize: "clamp(2rem, 2vw + 1.6rem, 3rem)", margin: "0.6rem auto 1.2rem", maxWidth: "20ch" }}>
            Cuéntanos tus fechas y te decimos qué apartamento encaja.
          </h2>
          <Link href="tel:+34659118006" className="btn btn--light">Llamar a Maior 5</Link>
        </div>
      </section>
    </>
  );
}
