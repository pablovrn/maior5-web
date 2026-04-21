"use client";

import Link from "next/link";
import { useState } from "react";

export function AboutCallButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="tel:+34659118006"
      style={{
        background: "white",
        color: "#0066cc",
        padding: "14px 28px",
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

export function AboutApartmentsButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/apartamentos"
      style={{
        background: isHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
        color: "white",
        padding: "14px 28px",
        border: "2px solid white",
        borderRadius: "12px",
        textDecoration: "none",
        fontWeight: "600",
        transition: "all 0.2s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Ver apartamentos
    </Link>
  );
}

export function AboutEmailButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="mailto:ayuda@maior5apartamentos.es"
      style={{
        background: isHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
        color: "white",
        padding: "14px 28px",
        border: "2px solid white",
        borderRadius: "12px",
        textDecoration: "none",
        fontWeight: "600",
        transition: "all 0.2s",
        marginTop: "12px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      ✉️ Enviar email
    </a>
  );
}
