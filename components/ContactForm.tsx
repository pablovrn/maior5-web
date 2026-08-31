"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { apartamentos } from "@/app/lib/apartamentos";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("apartamento") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      nombre: data.get("nombre"),
      email: data.get("email"),
      apartamento: data.get("apartamento"),
      mensaje: data.get("mensaje"),
    };

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({ ok: false }));

      if (!res.ok || !result.ok) {
        throw new Error(result.error || "No se ha podido enviar el mensaje.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "No se ha podido enviar el mensaje.");
    }
  }

  const sending = status === "sending";

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" type="text" required autoComplete="name" disabled={sending} />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" disabled={sending} />
      </div>
      <div className="field field--full">
        <label htmlFor="apartamento">Apartamento de interés</label>
        <select id="apartamento" name="apartamento" defaultValue={preselect} disabled={sending}>
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
        <textarea
          id="mensaje"
          name="mensaje"
          required
          disabled={sending}
          placeholder="Fechas, número de huéspedes o cualquier duda que tengas."
        />
      </div>
      <div className="field field--full">
        <button type="submit" className="btn btn--primary" disabled={sending}>
          {sending ? "Enviando…" : "Enviar consulta"}
        </button>
        <p className="form-note">Te responderemos por email en menos de 24 horas.</p>
        {status === "success" && (
          <p className="form-status form-status--ok" role="status">
            Mensaje enviado. Te contestaremos en breve.
          </p>
        )}
        {status === "error" && (
          <p className="form-status form-status--error" role="alert">
            {errorMsg}
          </p>
        )}
      </div>
    </form>
  );
}
