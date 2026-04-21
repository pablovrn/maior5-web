"use client";

import Link from "next/link";
import { useState } from "react";

export function CallButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="tel:+34659118006"
      style={{
        padding: "14px 28px",
        background: "linear-gradient(135deg, #4d9de0 0%, #7bb3e8 100%)",
        color: "white",
        borderRadius: "12px",
        textDecoration: "none",
        fontWeight: "600",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: isHovered
          ? "0 8px 20px rgba(77, 157, 224, 0.3)"
          : "0 4px 12px rgba(77, 157, 224, 0.2)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      📞 Llamar ahora
    </a>
  );
}

export function ViewApartmentsButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/apartamentos"
      style={{
        padding: "14px 28px",
        border: "2px solid #0066cc",
        borderRadius: "12px",
        textDecoration: "none",
        color: "#0066cc",
        fontWeight: "600",
        transition: "all 0.2s",
        background: isHovered ? "#e6f3ff" : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Ver apartamentos
    </Link>
  );
}

export function CtaButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="tel:+34659118006"
      style={{
        display: "inline-block",
        marginTop: "28px",
        padding: "14px 32px",
        background: "white",
        color: "#0066cc",
        borderRadius: "12px",
        textDecoration: "none",
        fontWeight: "600",
        transition: "transform 0.2s",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      📞 Llamar ahora
    </a>
  );
}

export function EmailButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="mailto:ayuda@maior5apartamentos.es"
      style={{
        display: "inline-block",
        marginTop: "28px",
        padding: "14px 32px",
        background: "white",
        color: "#0066cc",
        borderRadius: "12px",
        textDecoration: "none",
        fontWeight: "600",
        transition: "transform 0.2s",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      ✉️ Enviar email
    </a>
  );
}
