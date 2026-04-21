"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#f8f9fa",
        color: "#6c757d",
        padding: "40px 40px 20px",
        marginTop: "80px",
        borderTop: "1px solid #e9ecef",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Minimal Contact Info */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href="tel:+34659118006"
              style={{
                color: "#4d9de0",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              📞 +34 659 118 006
            </a>
            <span style={{ color: "#adb5bd" }}>•</span>
            <a
              href="mailto:ayuda@maior5apartamentos.es"
              style={{
                color: "#4d9de0",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              ✉️ ayuda@maior5apartamentos.es
            </a>
            <span style={{ color: "#adb5bd" }}>•</span>
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              Rúa Maior, 5 • Verín, Ourense
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ paddingTop: "20px", borderTop: "1px solid #dee2e6" }}>
          <p style={{ margin: 0, fontSize: "14px", color: "#adb5bd" }}>
            © 2024 Maior5 Apartamentos
          </p>
        </div>
      </div>
    </footer>
  );
}