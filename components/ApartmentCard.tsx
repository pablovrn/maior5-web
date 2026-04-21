"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ApartmentCard({ apt }: any) {
  const [cardHovered, setCardHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: cardHovered
          ? "0 8px 16px rgba(0, 0, 0, 0.12)"
          : "0 2px 8px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        transform: cardHovered ? "translateY(-4px)" : "translateY(0)",
        opacity: apt.disponible ? 1 : 0.7,
        position: "relative",
      }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      {!apt.disponible && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#ff4444",
            color: "white",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
            zIndex: 10,
          }}
        >
          OCUPADO
        </div>
      )}

      <div style={{ position: "relative", width: "100%", height: "200px" }}>
        <Image
          src={apt.imagen}
          alt={apt.nombre}
          fill
          priority={false}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div style={{ padding: "20px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", color: "#1a1a1a" }}>
          {apt.nombre}
        </h3>

        <div style={{ display: "flex", gap: "12px", marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          <span>📐 {apt.metros}m²</span>
          <span>🛏️ {apt.habitaciones} hab</span>
          <span>🚿 {apt.banos} baño{apt.banos > 1 ? 's' : ''}</span>
        </div>

        <p style={{ color: "#666", fontSize: "14px", marginBottom: "6px" }}>
          📍 {apt.planta} • {apt.orientacion}
        </p>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
          👥 Capacidad: {apt.capacidad} persona{apt.capacidad > 1 ? 's' : ''}
        </p>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {apt.amenities.slice(0, 4).map((amenity: string, index: number) => (
              <span
                key={index}
                style={{
                  background: "#e6f3ff",
                  color: "#0066cc",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: "500",
                }}
              >
                {amenity}
              </span>
            ))}
            {apt.amenities.length > 4 && (
              <span
                style={{
                  background: "#e6f3ff",
                  color: "#0066cc",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: "500",
                }}
              >
                +{apt.amenities.length - 4} más
              </span>
            )}
          </div>
        </div>

        <Link href={`/apartamentos/${apt.id}`} style={{ textDecoration: "none" }}>
          <button
            style={{
              width: "100%",
              padding: "11px",
              background: apt.disponible
                ? "linear-gradient(135deg, #4d9de0 0%, #7bb3e8 100%)"
                : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "500",
              cursor: apt.disponible ? "pointer" : "not-allowed",
              transition: "opacity 0.2s",
              opacity: buttonHovered && apt.disponible ? 0.9 : 1,
            }}
            onMouseEnter={() => apt.disponible && setButtonHovered(true)}
            onMouseLeave={() => apt.disponible && setButtonHovered(false)}
            disabled={!apt.disponible}
          >
            {apt.disponible ? "Ver detalles" : "No disponible"}
          </button>
        </Link>
      </div>
    </div>
  );
}
