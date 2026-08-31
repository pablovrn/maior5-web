import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import ContornoDivider from "@/components/ContornoDivider";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Sobre nosotros y contacto",
  description: "Conoce Maior 5 Apartamentos, cómo llegar a Verín y cómo ponerte en contacto para reservar.",
};

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="section section--stone" style={{ paddingTop: "clamp(7rem, 14vw, 9rem)" }}>
        <div className="wrap">
          <p className="eyebrow">Sobre nosotros</p>
          <h1 style={{ fontSize: "clamp(2.2rem, 2vw + 1.6rem, 3.2rem)", margin: "0.6rem 0 1.2rem", maxWidth: "18ch" }}>
            Un edificio en el corazón de Verín.
          </h1>
          <p className="lede" style={{ maxWidth: "56ch" }}>
            Maior 5 nació de la reforma integral de un edificio de los años 50 en pleno centro de Verín. Conservamos su fachada de
            estilo racionalista y renovamos por dentro cada uno de los cuatro apartamentos, pensados para estancias cortas y largas.
            Nuestra experiencia en el alquiler nos permite ofrecer un servicio de calidad, con atención personalizada y disponibilidad para cualquier consulta o necesidad que surja durante la estancia.
          </p>
        </div>
      </section>

      <ContornoDivider tone="sky" />

      <section id="ubicacion" className="section section--white">
        <div className="wrap location-grid">
          <div>
            <p className="eyebrow">Ubicación</p>
            <h2>Encuéntranos en el mapa</h2>
            <p className="lede">
              El edificio está en pleno centro de Verín, en Calle Maior, 5, a un paso de la plaza, los comercios y
              y restaurantes.
            </p>
            <dl className="address-block" style={{ borderTop: "none", paddingTop: 0 }}>
              <div>
                <dt>Dirección</dt>
                <dd>Calle Maior, 5 - 32600 Verín, Ourense</dd>
              </div>
            </dl>
            <div className="hero-cta" style={{ marginTop: "1.6rem" }}>
              <a
                href="https://share.google/gpGCtaa7692uatwLR"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>

          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps?q=Calle+Maior+5+32600+Ver%C3%ADn+Ourense&output=embed"
              title="Ubicación de Maior 5 Apartamentos en el mapa"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <ContornoDivider tone="mint" flip />

      <section id="contacto" className="section section--stone">
        <div className="wrap contact-grid">
          <div className="contact-info">
            <p className="eyebrow">Contacto</p>
            <h2>Escríbenos o llámanos</h2>
            <p className="lede">Respondemos en menos de 24 horas con disponibilidad y precio para tus fechas.</p>
            <dl>
              <div>
                <dt>Dirección</dt>
                <dd>Calle Maior, 5 — 32600 Verín, Ourense</dd>
              </div>
              <div>
                <dt>Teléfono</dt>
                <dd><a href="tel:+34659118006">+34 659 11 80 06</a></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:ayuda@maior5apartamentos.es">ayuda@maior5apartamentos.es</a></dd>
              </div>
            </dl>
          </div>

          <div>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
