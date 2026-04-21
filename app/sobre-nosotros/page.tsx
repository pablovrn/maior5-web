import Header from "@/components/Header";
import { AboutCallButton, AboutApartmentsButton } from "@/components/AboutButtons";
import { GoogleMapsButton } from "@/components/GoogleMapsButton";
import Footer from "@/components/Footer";

export default function SobreNosotros() {
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
            Sobre nosotros
          </h1>
          <p style={{ fontSize: "20px", color: "#666", lineHeight: "1.6" }}>
            Conoce Maior5, tu hogar en el corazón de Verín
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: "80px 40px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* Our Story & Commitment */}
          <div style={{ marginBottom: "80px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#1a1a1a", marginBottom: "20px" }}>
                  Nuestra historia
                </h2>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#666", marginBottom: "20px" }}>
                  Después de varios años en el mundo inmobiliario de Verín, nace Maior5 en 2023. 
                  Un edificio racionalista de los años 50 en pleno casco viejo, a escasos 20m de la Plaza García Barbón.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#666", marginBottom: "20px" }}>
                  <strong>Comprometidos con el turismo sostenible</strong> y la rehabilitación del patrimonio arquitectónico, 
                  ofrecemos 4 apartamentos perfectamente equipados para estancias vacacionales y de larga duración.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#666" }}>
                  <strong>Nos adaptamos a ti.</strong> Tu comodidad y satisfacción son nuestra prioridad.
                </p>
              </div>
              <div style={{ position: "relative", height: "400px" }}>
                <img
                  src="/images/verin/verin-5.jpg"
                  alt="Edificio Maior5 - Fachada histórica"
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

          {/* Our Values */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#1a1a1a", textAlign: "center", marginBottom: "40px" }}>
              Nuestros valores
            </h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px" }}>
              
              <div style={{ textAlign: "center", padding: "30px", background: "#f8fbff", borderRadius: "12px" }}>
                <div style={{ fontSize: "48px", marginBottom: "20px" }}>🤝</div>
                <h3 style={{ fontSize: "24px", fontWeight: "600", color: "#1a1a1a", marginBottom: "15px" }}>
                  Atención personalizada
                </h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>
                  Estamos aquí para resolver todas tus necesidades y hacer que tu estancia sea perfecta.
                </p>
              </div>

              <div style={{ textAlign: "center", padding: "30px", background: "#f8fbff", borderRadius: "12px" }}>
                <div style={{ fontSize: "48px", marginBottom: "20px" }}>🕊️</div>
                <h3 style={{ fontSize: "24px", fontWeight: "600", color: "#1a1a1a", marginBottom: "15px" }}>
                  Libertad total
                </h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>
                  Sin horarios ni restricciones. Tu tiempo es tuyo para disfrutar de Verín.
                </p>
              </div>

              <div style={{ textAlign: "center", padding: "30px", background: "#f8fbff", borderRadius: "12px" }}>
                <div style={{ fontSize: "48px", marginBottom: "20px" }}>😌</div>
                <h3 style={{ fontSize: "24px", fontWeight: "600", color: "#1a1a1a", marginBottom: "15px" }}>
                  Tranquilidad
                </h3>
                <p style={{ color: "#666", lineHeight: "1.6" }}>
                  Un entorno tranquilo en el corazón del casco antiguo, perfecto para descansar.
                </p>
              </div>

            </div>
          </div>

          {/* Location Map */}
          <div style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "700", color: "#1a1a1a", textAlign: "center", marginBottom: "20px" }}>
              Nuestra ubicación
            </h2>
            <p style={{ fontSize: "18px", color: "#666", textAlign: "center", marginBottom: "40px" }}>
              📍 Calle Maior, 5 - Verín (Ourense) | En pleno corazón del casco antiguo
            </p>
            
            <div style={{ 
              width: "100%", 
              height: "450px", 
              borderRadius: "16px", 
              overflow: "hidden",
              boxShadow: "0 12px 32px rgba(0, 102, 204, 0.15)",
              border: "2px solid #e6f3ff"
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.7496816214357!2d-7.4409249241016315!3d41.94122997123497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3ac10b045faaef%3A0x6151e4d1ecb817a6!2sMaior%205%20Apartamentos!5e0!3m2!1ses!2ses!4v1776790441021!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "saturate(1.1) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación moderna de Maior5 en Verín"
              ></iframe>
            </div>
            
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <GoogleMapsButton />
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
          ¿Listo para visitarnos?
        </h2>
        <p style={{ fontSize: "18px", marginBottom: "30px", opacity: 0.9 }}>
          Estamos aquí para hacer que tu estancia en Verín sea inolvidable
        </p>
        
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <AboutCallButton />
          <AboutApartmentsButton />
        </div>
      </section>

      <Footer />
    </main>
  );
}
