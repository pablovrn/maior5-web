import type { Metadata } from "next";
import ApartamentoCard from "@/components/ApartamentoCard";
import { apartamentos } from "@/app/lib/apartamentos";

export const metadata: Metadata = {
  title: "Apartamentos",
  description: "Los cuatro apartamentos de Maior 5, en Calle Maior 5, Verín. De 39 a 69 m², de 1 a 2 habitaciones.",
};

const PLANTAS = ["Primera planta", "Segunda planta"];

export default function ApartamentosPage() {
  return (
    <>
      <section className="section section--stone" style={{ paddingTop: "clamp(7rem, 14vw, 9rem)" }}>
        <div className="wrap">
          <p className="eyebrow">Alojamiento</p>
          <h1 style={{ fontSize: "clamp(2.2rem, 2vw + 1.6rem, 3.2rem)", margin: "0.6rem 0 1rem" }}>
            Cuatro apartamentos nuevos y modernos en el corazón de Verín.
          </h1>
          <p className="lede">
            De 39 a 69 m², de 1 a 2 habitaciones y hasta 6 plazas. Todos con cocina equipada, aire acondicionado y
            todo tipo de comodidades, repartidos en dos plantas del número 5 de la Calle Maior.
          </p>
        </div>
      </section>

      <section className="section section--white">
        <div className="wrap">
          {PLANTAS.map((planta) => {
            const enPlanta = apartamentos.filter((a) => a.planta === planta);
            if (enPlanta.length === 0) return null;
            return (
              <div className="apt-group" key={planta}>
                <p className="apt-group-label mono">{planta}</p>
                <div className="apt-grid">
                  {enPlanta.map((apartamento) => (
                    <ApartamentoCard key={apartamento.id} apartamento={apartamento} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
