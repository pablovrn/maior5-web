"use client";

import Link from "next/link";
import { useState } from "react";

export function ViewAllApartmentsButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/apartamentos"
      style={{
        background: "linear-gradient(135deg, #4d9de0 0%, #7bb3e8 100%)",
        color: "white",
        padding: "16px 32px",
        borderRadius: "12px",
        textDecoration: "none",
        fontWeight: "600",
        fontSize: "16px",
        display: "inline-block",
        transition: "transform 0.2s",
        boxShadow: "0 4px 12px rgba(77, 157, 224, 0.3)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Ver todos los apartamentos →
    </Link>
  );
}