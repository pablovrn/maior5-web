import { apartamentos } from "@/data/apartamentos";
import ApartmentCard from "@/components/ApartmentCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CallButton, ViewApartmentsButton } from "@/components/HeroButtons";

export default function ApartamentosPage() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", color: "#1a1a1a" }}>
      <Header />

      {/* Hero Section */}
      <section
        style={{
          padding: "120px 40px 80px",
          textAlign: "center",
          background: "linear-gradient(135deg, #e6f3ff 0%, #ffffff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 2, maxWidth: "800px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "20px",
            }}
          >
            Nuestros apartamentos
          </h1>
          <p style={{ fontSize: "20px", color: "#666", lineHeight: "1.6" }}>
            Descubre todos nuestros apartamentos disponibles en Verín.
            <br />
            Elige el que mejor se adapte a tu estancia.
          </p>

          <div style={{ marginTop: "40px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <CallButton />
          </div>
        </div>
      </section>

      {/* Apartments Grid */}
      <section style={{ padding: "80px 40px", background: "#f8fbff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px",
            }}
          >
            {apartamentos.map((apt) => (
              <ApartmentCard key={apt.id} apt={apt} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}