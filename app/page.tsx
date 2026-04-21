import { AboutUsLink } from "@/components/AboutUsLink";
import Link from "next/link";
import { apartamentos } from "@/data/apartamentos";
import ApartmentCarousel from "@/components/ApartmentCarousel";
import { CallButton, ViewApartmentsButton, CtaButton, EmailButton } from "@/components/HeroButtons";
import { ViewAllApartmentsButton } from "@/components/ViewAllApartmentsButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", color: "#1a1a1a" }}>
      <Header />
      
      {/* HERO */}
      <section
        style={{
          padding: "120px 40px 100px",
          textAlign: "center",
          background: "linear-gradient(135deg, #e6f3ff 0%, #ffffff 100%)",
          minHeight: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Verin Images */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            zIndex: 1,
          }}
        >
          <img
            src="/images/verin/verin-1.png"
            alt=""
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "200px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              transform: "rotate(-5deg)",
            }}
          />
          <img
            src="/images/verin/verin-2.jpg"
            alt=""
            style={{
              position: "absolute",
              top: "60%",
              right: "15%",
              width: "180px",
              height: "135px",
              objectFit: "cover",
              borderRadius: "8px",
              transform: "rotate(3deg)",
            }}
          />
          <img
            src="/images/verin/verin-3.jpg"
            alt=""
            style={{
              position: "absolute",
              top: "30%",
              right: "5%",
              width: "160px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "8px",
              transform: "rotate(-2deg)",
            }}
          />
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <p style={{ letterSpacing: "3px", color: "#0066cc", fontSize: "14px", fontWeight: "600" }}>
            ALOJAMIENTOS EN VERÍN
          </p>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: "700",
              marginTop: "16px",
              lineHeight: "1.2",
              color: "#1a1a1a",
            }}
          >
            Estancias cómodas, <br /> simples y sin intermediarios
          </h1>

          <p style={{ marginTop: "24px", fontSize: "18px", color: "#666", maxWidth: "500px", margin: "24px auto 0" }}>
            Apartamentos modernos preparados para estancias cortas y medias en el corazón de Galicia.
          </p>

          <div style={{ marginTop: "40px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <CallButton />
            <ViewApartmentsButton />
          </div>
        </div>
      </section>

      {/* APARTAMENTOS */}
      <section style={{ padding: "80px 40px", background: "#f8fbff" }}>
        
        <div style={{ textAlign: "center", marginBottom: "60px", maxWidth: "600px", margin: "0 auto 60px" }}>
          <h2 style={{ fontSize: "42px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }}>
            Nuestros apartamentos
          </h2>
          <p style={{ color: "#666", fontSize: "16px" }}>
            Elige el que mejor se adapte a tu estancia en Verín
          </p>
        </div>

        <ApartmentCarousel apartments={apartamentos} />

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <ViewAllApartmentsButton />
        </div>
      </section>

      {/* SOBRE VERIN */}
      <section style={{ padding: "80px 40px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#1a1a1a", marginBottom: "20px" }}>
                Descubre Verín
              </h2>
              <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
                Verín es una encantadora localidad gallega situada en la provincia de Ourense, 
                en la frontera con Portugal. Conocida por su rica historia, su arquitectura tradicional 
                y su proximidad a la naturaleza, ofrece el escenario perfecto para unas vacaciones inolvidables.
              </p>
              <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6", marginBottom: "30px" }}>
                Desde nuestros apartamentos podrás explorar el casco histórico, disfrutar de la gastronomía 
                local y relajarte en un entorno tranquilo y acogedor.
              </p>
              <AboutUsLink />
            </div>
            <div style={{ position: "relative", height: "400px" }}>
              <img
                src="/images/verin/verin-4.jpg"
                alt="Verín - Vista panorámica"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0, 102, 204, 0.2)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        style={{
          padding: "120px 40px",
          textAlign: "center",
          background: "linear-gradient(135deg, #4d9de0 0%, #7bb3e8 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "48px", fontWeight: "700", marginBottom: "16px", lineHeight: "1.2" }}>
            ¿Listo para tu estancia perfecta en Verín?
          </h2>

          <p style={{ marginTop: "16px", color: "rgba(255, 255, 255, 0.9)", fontSize: "20px", lineHeight: "1.4" }}>
            Contacta con nosotros directamente y reserva tu apartamento ideal.
            <br />
            Sin intermediarios, sin complicaciones.
          </p>

          <div style={{ marginTop: "50px", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <CtaButton />
            <EmailButton />
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
