// Imágenes de Verín usadas en la web. Los nombres de archivo son una suposición
// razonable a partir de "public/images/verin" — renombra tus archivos para que
// coincidan, o edita las rutas de abajo.
export interface VerinImage {
  src: string;
  alt: string;
}

export const verinImages: VerinImage[] = [
  { src: "/images/1a/1a_4.jpg", alt: "Alojamiento en Verín" },
  { src: "/images/verin/verin-2.jpg", alt: "Castillo de Monterrei" },
  { src: "/images/verin/verin-4.jpg", alt: "Plaza Mayor de Verín" },
  { src: "/images/verin/verin-7.jpg", alt: "Cigarrón, Entroido de Verín" },
  { src: "/images/verin/verin-3.jpg", alt: "Vista aérea de Verín" },
];
