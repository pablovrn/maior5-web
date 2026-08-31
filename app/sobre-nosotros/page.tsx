import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import ContornoDivider from "@/components/ContornoDivider";
import ContactForm from "@/components/ContactForm";
import { verinImages } from "@/app/lib/verin";

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

      <section className="section section--white">
        <div className="wrap location-grid">
          <div>
            <p className="eyebrow">Cómo llegar</p>
            <h2>En coche, en tren o andando desde la plaza</h2>
            <dl className="address-block" style={{ borderTop: "none", paddingTop: 0, flexDirection: "column", gap: "1.2rem" }}>
              <div>
                <dt>En coche</dt>
                <dd>Salida de la A-52 en Verín; el edificio está a cinco minutos del desvío, en el centro del casco urbano.</dd>
              </div>
              <div>
                <dt>En tren o autobús</dt>
                <dd>Desde la estación de Verín, quince minutos andando por la Calle Maior hasta el número 5.</dd>
              </div>
              <div>
                <dt>Desde la plaza mayor</dt>
                <dd>Dos minutos a pie: el edificio está sobre la misma calle, entre comercios y cafeterías.</dd>
              </div>
            </dl>
          </div>
          <div className="location-collage">
            <Image src={verinImages[2]?.src ?? verinImages[0].src} alt={verinImages[2]?.alt ?? ""} width={480} height={600} style={{ objectFit: "cover" }} />
            <Image src={verinImages[0].src} alt={verinImages[0].alt} width={300} height={300} style={{ objectFit: "cover" }} />
            <Image src={verinImages[3]?.src ?? verinImages[1]?.src ?? verinImages[0].src} alt={verinImages[3]?.alt ?? ""} width={300} height={300} style={{ objectFit: "cover" }} />
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
