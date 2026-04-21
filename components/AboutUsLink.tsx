"use client";

import Link from "next/link";
import { useState } from "react";

export function AboutUsLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/sobre-nosotros"
      style={{
        background: "linear-gradient(135deg, #4d9de0 0%, #7bb3e8 100%)",
        color: "white",
        padding: "12px 24px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "600",
        display: "inline-block",
        transition: "transform 0.2s",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Conoce más sobre nosotros →
    </Link>
  );
}
