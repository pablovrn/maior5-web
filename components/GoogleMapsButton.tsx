"use client";

import { useState } from "react";

export function GoogleMapsButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="https://maps.app.goo.gl/fNPBoqTkvhTmxXdy6"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px 24px",
        background: "linear-gradient(135deg, #4d9de0 0%, #7bb3e8 100%)",
        color: "white",
        textDecoration: "none",
        borderRadius: "12px",
        fontWeight: "600",
        fontSize: "16px",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 4px 12px rgba(77, 157, 224, 0.3)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      🗺️ Ver en Google Maps
    </a>
  );
}