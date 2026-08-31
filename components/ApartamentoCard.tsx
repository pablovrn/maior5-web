import Image from "next/image";
import Link from "next/link";
import type { Apartamento } from "@/app/lib/apartamentos";

function primeraFrase(texto: string) {
  const corte = texto.indexOf(". ");
  return corte === -1 ? texto : texto.slice(0, corte + 1);
}

export default function ApartamentoCard({ apartamento }: { apartamento: Apartamento }) {
  return (
    <Link href={`/apartamentos/${apartamento.id}`} className="apt-card">
      <div className="apt-card-media">
        <span className={`badge ${apartamento.disponible ? "" : "badge--off"}`}>
          {apartamento.disponible ? "Disponible" : "Ocupado"}
        </span>
        <Image
          src={apartamento.imagen}
          alt={apartamento.nombre}
          fill
          sizes="(min-width: 1080px) 25vw, (min-width: 640px) 50vw, 100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="apt-card-body">
        <div>
          <h3>{apartamento.nombre}</h3>
          <p className="apt-card-plot">{apartamento.planta} · orientación {apartamento.orientacion}</p>
        </div>
        <div className="apt-specs">
          <span>{apartamento.metros} m²</span>
          <span>{apartamento.habitaciones} hab.</span>
          <span>{apartamento.banos} baño{apartamento.banos > 1 ? "s" : ""}</span>
          <span>{apartamento.capacidad} pers.</span>
        </div>
        <p className="apt-card-desc">{primeraFrase(apartamento.descripcion)}</p>
        <div className="apt-card-foot">
          <span className="link-arrow">Ver apartamento →</span>
        </div>
      </div>
    </Link>
  );
}
