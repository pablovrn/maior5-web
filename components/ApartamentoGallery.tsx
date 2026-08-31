"use client";

import { useState } from "react";
import Image from "next/image";

export default function ApartamentoGallery({ imagenes, nombre }: { imagenes: string[]; nombre: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="gallery-main">
        <Image
          key={imagenes[active]}
          src={imagenes[active]}
          alt={`${nombre} — foto ${active + 1}`}
          fill
          priority
          sizes="(min-width: 960px) 55vw, 100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      {imagenes.length > 1 && (
        <div className="gallery-thumbs">
          {imagenes.map((src, i) => (
            <button
              key={src}
              type="button"
              className={i === active ? "is-active" : ""}
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1} de ${nombre}`}
              aria-pressed={i === active}
            >
              <Image src={src} alt="" width={78} height={58} style={{ objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
