"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/apartamentos", label: "Apartamentos" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
        <div className="wrap header-row">
          <Link href="/" className="brand" aria-label="Maior 5 Apartamentos, ir a inicio">
            <Image src="/images/logo/logo_blanco.png" alt="" width={52} height={37} />
            <span className="brand-name">
              Maior 5
              <span>Apartamentos en Verín</span>
            </span>
          </Link>

          <nav className="main-nav" aria-label="Navegación principal">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="tel:+34659118006" className="btn btn--call btn--sm">
                  Llamar
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="nav-toggle"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-nav ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <span className="mono">MENÚ</span>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <a href="tel:+34659118006" className="mobile-nav-call" onClick={() => setOpen(false)}>
          Llamar
        </a>
      </div>
    </>
  );
}
