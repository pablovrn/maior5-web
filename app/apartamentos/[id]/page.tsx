import { apartamentos } from "@/data/apartamentos";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ImageCarousel } from "@/components/ImageCarousel";
import { AboutCallButton, AboutApartmentsButton, AboutEmailButton } from "@/components/AboutButtons";

export default async function ApartamentoPage({ params }: any) {
  const { id } = await params;

  const apt = apartamentos.find((a) => a.id === id);

  if (!apt) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", color: "#1a1a1a" }}>
        <Header />
        <div style={{ padding: "120px 40px", textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#1a1a1a", marginBottom: "20px" }}>
            Apartamento no encontrado
          </h1>
          <p style={{ color: "#666", marginBottom: "40px" }}>
            El apartamento que buscas no existe o no está disponible.
          </p>
          <AboutApartmentsButton />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", color: "#1a1a1a" }}>
      <Header />

      {/* Hero Section with Carousel */}
      <section
        style={{
          padding: "80px 40px 60px",
          background: "linear-gradient(135deg, #e6f3ff 0%, #ffffff 100%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            {/* Image Carousel */}
            <div>
              <ImageCarousel images={apt.imagenes} alt={apt.nombre} />
            </div>

            {/* Apartment Info */}
            <div>
              <h1 style={{ fontSize: "36px", fontWeight: "700", color: "#1a1a1a", marginBottom: "12px" }}>
                {apt.nombre}
              </h1>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{
                  background: apt.disponible ? "#d4edda" : "#f8d7da",
                  color: apt.disponible ? "#155724" : "#721c24",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}>
                  {apt.disponible ? "Disponible" : "Ocupado"}
                </span>
                <span style={{ color: "#666", fontSize: "16px" }}>
                  {apt.planta}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "24px" }}>
                <div style={{ background: "white", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "#0066cc" }}>{apt.capacidad}</div>
                  <div style={{ color: "#666", fontSize: "14px" }}>Capacidad</div>
                </div>
                <div style={{ background: "white", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "#0066cc" }}>{apt.metros}m²</div>
                  <div style={{ color: "#666", fontSize: "14px" }}>Superficie</div>
                </div>
                <div style={{ background: "white", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "#0066cc" }}>{apt.habitaciones}</div>
                  <div style={{ color: "#666", fontSize: "14px" }}>Habitaciones</div>
                </div>
                <div style={{ background: "white", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "#0066cc" }}>{apt.banos}</div>
                  <div style={{ color: "#666", fontSize: "14px" }}>Baños</div>
                </div>
              </div>

              <div style={{ background: "white", padding: "24px", borderRadius: "12px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#1a1a1a", marginBottom: "12px" }}>
                  Descripción
                </h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>
                  {apt.descripcion}
                </p>
              </div>

              {/* Amenities */}
              <div style={{ background: "white", padding: "24px", borderRadius: "12px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#1a1a1a", marginBottom: "16px" }}>
                  Equipamiento
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {apt.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      style={{
                        background: "#f8fbff",
                        color: "#0066cc",
                        padding: "6px 12px",
                        borderRadius: "16px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Buttons */}
              <div style={{ background: "white", padding: "24px", borderRadius: "12px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#1a1a1a", marginBottom: "16px" }}>
                  ¿Interesado en este apartamento?
                </h3>
                <p style={{ color: "#666", marginBottom: "20px" }}>
                  Contacta con nosotros para más información y disponibilidad.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <AboutCallButton />
                  <AboutEmailButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "80px 40px",
          textAlign: "center",
          background: "linear-gradient(135deg, #4d9de0 0%, #7bb3e8 100%)",
          color: "white",
        }}
      >
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "20px" }}>
          ¿Quieres ver más apartamentos?
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "30px", opacity: 0.9 }}>
          Descubre todas nuestras opciones de alojamiento en Verín
        </p>
        <AboutApartmentsButton />
      </section>

      <Footer />
    </main>
  );
}
