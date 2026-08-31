import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Image src="/images/logo/logo_blanco.png" alt="Maior 5 Apartamentos" width={52} height={37} />
          <p>Cuatro apartamentos reformados en el número 5 de la calle Maior, en pleno centro de Verín, Ourense.</p>
        </div>

        <div className="footer-col">
          <h4>Navegación</h4>
          <ul>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/apartamentos">Apartamentos</Link></li>
            <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
            <li><Link href="/sobre-nosotros#contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li>Calle Maior, 5 — 32600 Verín, Ourense</li>
            <li><a href="tel:+34659118006">+34 659 11 80 06</a></li>
            <li><a href="mailto:ayuda@maior5apartamentos.es">ayuda@maior5apartamentos.es</a></li>
          </ul>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Maior 5 Apartamentos.</span>
        <span>Verín, Galicia.</span>
      </div>
    </footer>
  );
}
