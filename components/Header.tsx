"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(135deg, #4d9de0 0%, #7bb3e8 50%, #4d9de0 100%)",
        boxShadow: "0 2px 10px rgba(77, 157, 224, 0.15)",
        zIndex: 1000,
        padding: "0 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ 
            background: "transparent", 
            padding: "4px", 
            borderRadius: "12px",
            border: "2px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
          }}>
            <Image
              src="/images/logo/logo.png"
              alt="Maior5 Logo"
              width={48}
              height={48}
              style={{ borderRadius: "8px" }}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ display: "none", gap: "24px", alignItems: "center" }} className="desktop-nav">
          <Link
            href="/apartamentos"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "16px",
              padding: "8px 12px",
              borderRadius: "6px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Apartamentos
          </Link>
          <Link
            href="/sobre-nosotros"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "16px",
              padding: "8px 12px",
              borderRadius: "6px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Sobre nosotros
          </Link>
          <a
            href="tel:+34659118006"
            style={{
              background: "white",
              color: "#0066cc",
              padding: "8px 16px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              transition: "all 0.2s",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
            }}
          >
            📞 Llamar
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "block",
            background: "none",
            border: "none",
            fontSize: "20px",
            color: "white",
            cursor: "pointer",
            padding: "8px",
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderTop: "1px solid rgba(77, 157, 224, 0.15)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backdropFilter: "blur(10px)",
          }}
        >
          <Link
            href="/apartamentos"
            style={{
              color: "#0066cc",
              textDecoration: "none",
              fontWeight: "500",
              padding: "8px 0",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Apartamentos
          </Link>
          <Link
            href="/sobre-nosotros"
            style={{
              color: "#0066cc",
              textDecoration: "none",
              fontWeight: "500",
              padding: "8px 0",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Sobre nosotros
          </Link>
          <a
            href="tel:+34659118006"
            style={{
              background: "#4d9de0",
              color: "white",
              padding: "10px 16px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "500",
              textAlign: "center",
              marginTop: "4px",
            }}
            onClick={() => setMenuOpen(false)}
          >
            📞 Llamar
          </a>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
