"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { apartamentos } from "@/app/lib/apartamentos";

const CONTACT_EMAIL = "ayuda@maior5apartamentos.es";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("apartamento") ?? "";
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nombre = data.get("nombre");
    const email = data.get("email");
    const apartamento = data.get("apartamento");
    const mensaje = data.get("mensaje");

    const asunto = `Consulta de ${nombre} — Maior 5 Apartamentos`;
    const cuerpo = [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      apartamento ? `Apartamento de interés: ${apartamento}` : null,
      "",
      String(mensaje ?? ""),
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    setStatus("sent");
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" type="text" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field field--full">
        <label htmlFor="apartamento">Apartamento de interés</label>
        <select id="apartamento" name="apartamento" defaultValue={preselect}>
          <option value="">Sin preferencia</option>
          {apartamentos.map((a) => (
            <option key={a.id} value={a.nombre}>
              {a.nombre} · {a.planta}
            </option>
          ))}
        </select>
      </div>
      <div className="field field--full">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" required placeholder="Fechas, número de huéspedes o cualquier duda que tengas." />
      </div>
      <div className="field field--full">
        <button type="submit" className="btn btn--primary">Enviar consulta</button>
        <p className="form-note">Al enviar se abrirá tu cliente de correo con el mensaje ya redactado a {CONTACT_EMAIL}.</p>
        {status === "sent" && <p className="form-status">Abriendo tu correo…</p>}
      </div>
    </form>
  );
}
