import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApartamentoGallery from "@/components/ApartamentoGallery";
import ApartamentoCard from "@/components/ApartamentoCard";
import AmenityList from "@/components/AmenityIcon";
import { apartamentos, getApartamentoById, getOtrosApartamentos } from "@/app/lib/apartamentos";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return apartamentos.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const apartamento = getApartamentoById(id);
  if (!apartamento) return {};
  return {
    title: apartamento.nombre,
    description: apartamento.descripcion,
  };
}

export default async function ApartamentoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const apartamento = getApartamentoById(id);
  if (!apartamento) notFound();

  const otros = getOtrosApartamentos(apartamento.id);

  return (
    <>
      <section className="section section--stone" style={{ paddingTop: "clamp(7rem, 14vw, 9rem)", paddingBottom: "1rem" }}>
        <div className="wrap">
          <Link href="/apartamentos" className="link-arrow">← Apartamentos</Link>
        </div>
      </section>

      <section className="section--stone" style={{ paddingBottom: "clamp(3.5rem, 8vw, 7rem)" }}>
        <div className="wrap detail-layout">
          <ApartamentoGallery imagenes={apartamento.imagenes} nombre={apartamento.nombre} />

          <div>
            <div className="detail-head">
              <div>
                <h1>{apartamento.nombre}</h1>
                <p className="detail-plot">{apartamento.planta} · orientación {apartamento.orientacion}</p>
              </div>
              <span className={`badge ${apartamento.disponible ? "" : "badge--off"}`} style={{ position: "static" }}>
                {apartamento.disponible ? "Disponible" : "Ocupado"}
              </span>
            </div>

            <div className="spec-grid">
              <div><strong>{apartamento.metros} m²</strong><span>Superficie</span></div>
              <div><strong>{apartamento.habitaciones}</strong><span>Habitaciones</span></div>
              <div><strong>{apartamento.banos}</strong><span>Baños</span></div>
              <div><strong>{apartamento.capacidad}</strong><span>Capacidad</span></div>
            </div>

            <p className="lede" style={{ maxWidth: "none" }}>{apartamento.descripcion}</p>

            <AmenityList amenities={apartamento.amenities} />

            <div className="detail-actions">
              <Link
                href={`/sobre-nosotros?apartamento=${apartamento.id}#contacto`}
                className="btn btn--primary"
              >
                Consultar disponibilidad
              </Link>
              <Link href="/apartamentos" className="btn btn--ghost">Ver otros apartamentos</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">También en el número 5</p>
              <h2>Otros apartamentos</h2>
            </div>
          </div>
          <div className="others-row">
            {otros.map((a) => (
              <ApartamentoCard key={a.id} apartamento={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
