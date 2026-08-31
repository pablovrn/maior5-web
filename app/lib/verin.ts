// Imágenes de Verín usadas en la web. Los nombres de archivo son una suposición
// razonable a partir de "public/images/verin" — renombra tus archivos para que
// coincidan, o edita las rutas de abajo.
export interface VerinImage {
  src: string;
  alt: string;
}

export const verinImages: VerinImage[] = [
  { src: "/images/verin/verin-1.png", alt: "Castillo de Monterrei, junto a Verín" },
  { src: "/images/verin/verin-2.jpg", alt: "Viñedos de la D.O. Monterrei" },
  { src: "/images/verin/verin-3.jpg", alt: "Casco histórico de Verín" },
  { src: "/images/verin/verin-4.jpg", alt: "Vistas del valle de Verín" },
];
