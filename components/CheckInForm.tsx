"use client";

import { useState, type FormEvent } from "react";
import type { Country } from "@/app/lib/countries";
import type { Relationship } from "@/app/lib/relationships";

type Status = "idle" | "sending" | "success" | "error";
type Guest = { id: number };

const guestFields = [
  { name: "nombre", label: "Nombre", required: true, autoComplete: "given-name" },
  { name: "apellido1", label: "Primer apellido", required: true, autoComplete: "family-name" },
  { name: "apellido2", label: "Segundo apellido" },
  { name: "fechaNacimiento", label: "Fecha de nacimiento", type: "date" },
  { name: "direccion", label: "Dirección", required: true },
  { name: "codigoPostal", label: "Código postal", required: true },
  { name: "telefono", label: "Teléfono", type: "tel", required: false, autoComplete: "tel" },
  { name: "telefono2", label: "Teléfono adicional", type: "tel", required: false },
  { name: "correo", label: "Correo electrónico", type: "email", required: false, autoComplete: "email" },
] as const;

const DOCUMENT_NUMBER_PATTERNS: Record<string, string> = {
  NIF: "[0-9]{8}[A-Za-z]",
  NIE: "[XYZxyz][0-9]{7}[A-Za-z]",
};
const DOCUMENT_SUPPORT_PATTERNS: Record<string, string> = {
  NIF: "[A-Za-z]{3}[0-9]{6}",
  NIE: "[ECec][0-9]{8}",
};

export default function CheckInForm({
  countries,
  relationships,
}: {
  countries: Country[];
  relationships: Relationship[];
}) {
  const [guests, setGuests] = useState<Guest[]>([{ id: 1 }]);
  const [residenceCountries, setResidenceCountries] = useState<Record<number, string>>({ 1: "ESP" });
  const [birthDates, setBirthDates] = useState<Record<number, string>>({});
  const [documentTypes, setDocumentTypes] = useState<Record<number, string>>({});
  const [nationalities, setNationalities] = useState<Record<number, string>>({ 1: "ESP" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [reference, setReference] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const payload = {
      titularReserva: value("titularReserva"),
      fechaEntrada: value("fechaEntrada"),
      fechaSalida: value("fechaSalida"),
      tipoPago: value("tipoPago"),
      personas: guests.map(({ id }) => ({
        nombre: value(`persona-${id}-nombre`),
        apellido1: value(`persona-${id}-apellido1`),
        apellido2: value(`persona-${id}-apellido2`),
        tipoDocumento: value(`persona-${id}-tipoDocumento`),
        numeroDocumento: value(`persona-${id}-numeroDocumento`),
        soporteDocumento: value(`persona-${id}-soporteDocumento`),
        fechaNacimiento: value(`persona-${id}-fechaNacimiento`),
        nacionalidad: value(`persona-${id}-nacionalidad`),
        direccion: value(`persona-${id}-direccion`),
        codigoMunicipio: value(`persona-${id}-codigoMunicipio`),
        nombreMunicipio: value(`persona-${id}-nombreMunicipio`),
        codigoPostal: value(`persona-${id}-codigoPostal`),
        pais: value(`persona-${id}-pais`),
        telefono: value(`persona-${id}-telefono`),
        telefono2: value(`persona-${id}-telefono2`),
        correo: value(`persona-${id}-correo`),
        parentesco: value(`persona-${id}-parentesco`),
      })),
    };

    if (payload.personas.some((person) => !person.telefono && !person.telefono2 && !person.correo)) {
      setStatus("error");
      setErrorMsg("Indica al menos un dato de contacto por viajero: teléfono, teléfono adicional o correo electrónico.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    setReference("");

    try {
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({ ok: false }));
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "No se ha podido enviar el check-in.");
      }

      setReference(result.reference);
      setStatus("success");
      form.reset();
      setGuests([{ id: 1 }]);
      setResidenceCountries({ 1: "ESP" });
      setBirthDates({});
      setDocumentTypes({});
      setNationalities({ 1: "ESP" });
    } catch (error) {
      setStatus("error");
      setErrorMsg(error instanceof Error ? error.message : "No se ha podido enviar el check-in.");
    }
  }

  const sending = status === "sending";
  const todayInSpain = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date());
  const getAge = (birthDate: string) => {
    if (!birthDate) return null;
    const [birthYear, birthMonth, birthDay] = birthDate.split("-").map(Number);
    const [year, month, day] = todayInSpain.split("-").map(Number);
    return year - birthYear - (month < birthMonth || (month === birthMonth && day < birthDay) ? 1 : 0);
  };
  const hasMinor = Object.values(birthDates).some((birthDate) => {
    const age = getAge(birthDate);
    return age !== null && age < 18;
  });
  const requiresDocument = (id: number) => {
    const age = getAge(birthDates[id] ?? "");
    return age !== null && (age >= 18 || (age > 14 && nationalities[id] === "ESP"));
  };

  function addGuest() {
    const id = Math.max(...guests.map(({ id: guestId }) => guestId)) + 1;
    setGuests((current) => [...current, { id }]);
    setResidenceCountries((current) => ({ ...current, [id]: "ESP" }));
  }

  function removeGuest(id: number) {
    setGuests((current) => current.filter((guest) => guest.id !== id));
    setBirthDates((current) => {
      const remaining = { ...current };
      delete remaining[id];
      return remaining;
    });
    setDocumentTypes((current) => {
      const remaining = { ...current };
      delete remaining[id];
      return remaining;
    });
    setNationalities((current) => {
      const remaining = { ...current };
      delete remaining[id];
      return remaining;
    });
    setResidenceCountries((current) => {
      const remaining = { ...current };
      delete remaining[id];
      return remaining;
    });
  }

  return (
    <form className="form-grid checkin-form" onSubmit={handleSubmit}>
      <fieldset className="checkin-fieldset field--full">
        <legend>Datos de la estancia</legend>
        <div className="checkin-fields">
          <div className="field field--full">
            <label htmlFor="titularReserva">Nombre del titular de la reserva</label>
            <input id="titularReserva" name="titularReserva" autoComplete="name" maxLength={200} required disabled={sending} />
          </div>
          <div className="field">
            <label htmlFor="fechaEntrada">Fecha de entrada</label>
            <input id="fechaEntrada" name="fechaEntrada" type="date" required disabled={sending} />
          </div>
          <div className="field">
            <label htmlFor="fechaSalida">Fecha de salida</label>
            <input id="fechaSalida" name="fechaSalida" type="date" required disabled={sending} />
          </div>
          <div className="field">
            <label htmlFor="tipoPago">Tipo de pago</label>
            <select id="tipoPago" name="tipoPago" defaultValue="EFECT" required disabled={sending}>
              <option value="DESTI">DESTI · Domiciliación</option>
              <option value="EFECT">EFECT · Efectivo</option>
              <option value="TARJT">TARJT · Tarjeta</option>
              <option value="PLATF">PLATF · Plataforma</option>
              <option value="TRANS">TRANS · Transferencia</option>
              <option value="MOVIL">MOVIL · Pago móvil</option>
              <option value="TREG">TREG · Tarjeta regalo</option>
              <option value="OTRO">OTRO · Otro</option>
            </select>
          </div>
        </div>
      </fieldset>

      {guests.map((guest, index) => (
        <fieldset className="checkin-fieldset field--full" key={guest.id}>
          <legend>
            Viajero {index + 1}
            {guests.length > 1 && (
              <button
                className="checkin-remove"
                type="button"
                onClick={() => removeGuest(guest.id)}
                disabled={sending}
              >
                Eliminar
              </button>
            )}
          </legend>
          <input type="hidden" name={`persona-${guest.id}-rol`} value="VI" />
          <div className="checkin-fields">
            {guestFields.map((field) => {
              const fieldId = `persona-${guest.id}-${field.name}`;
              const commonProps = {
                id: fieldId,
                name: fieldId,
                required:
                  field.name === "apellido2"
                    ? requiresDocument(guest.id) && documentTypes[guest.id] === "NIF"
                    : "required" in field
                      ? field.required
                      : true,
                disabled: sending,
                autoComplete: "autoComplete" in field ? field.autoComplete : undefined,
                pattern: field.name === "codigoPostal" ? "[0-9]{5}" : undefined,
                title: field.name === "codigoPostal" ? "El código postal debe tener exactamente 5 dígitos." : undefined,
              };

              return (
                <div className="field" key={field.name}>
                  <label htmlFor={fieldId}>{field.label}</label>
                  <input
                    {...commonProps}
                    type={"type" in field ? field.type : "text"}
                    onChange={field.name === "fechaNacimiento"
                      ? (event) => setBirthDates((current) => ({ ...current, [guest.id]: event.target.value }))
                      : undefined}
                  />
                </div>
              );
            })}
            <div className="field">
              <label htmlFor={`persona-${guest.id}-nacionalidad`}>Nacionalidad</label>
              <select
                id={`persona-${guest.id}-nacionalidad`}
                name={`persona-${guest.id}-nacionalidad`}
                value={nationalities[guest.id] ?? "ESP"}
                onChange={(event) => setNationalities((current) => ({ ...current, [guest.id]: event.target.value }))}
                required
                disabled={sending}
              >
                {countries.map(({ code, name }) => <option key={code} value={code}>{name} ({code})</option>)}
              </select>
            </div>
            {requiresDocument(guest.id) && (
              <>
                <div className="field">
                  <label htmlFor={`persona-${guest.id}-tipoDocumento`}>Tipo de documento</label>
                  <select
                    id={`persona-${guest.id}-tipoDocumento`}
                    name={`persona-${guest.id}-tipoDocumento`}
                    value={documentTypes[guest.id] ?? ""}
                    onChange={(event) => setDocumentTypes((current) => ({ ...current, [guest.id]: event.target.value }))}
                    required
                    disabled={sending}
                  >
                    <option value="">Selecciona el tipo</option>
                    {["NIF", "NIE", "PAS", "OTRO"].map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                {documentTypes[guest.id] && (
                  <>
                    <div className="field">
                      <label htmlFor={`persona-${guest.id}-numeroDocumento`}>Número de documento</label>
                      <input
                        id={`persona-${guest.id}-numeroDocumento`}
                        name={`persona-${guest.id}-numeroDocumento`}
                        pattern={DOCUMENT_NUMBER_PATTERNS[documentTypes[guest.id]]}
                        title={documentTypes[guest.id] === "NIF"
                          ? "Formato NIF: 8 dígitos y una letra (ejemplo: 11111111A)."
                          : documentTypes[guest.id] === "NIE"
                            ? "Formato NIE: X, Y o Z, 7 dígitos y una letra (ejemplo: X1111111A)."
                            : undefined}
                        required
                        disabled={sending}
                      />
                    </div>
                    {["NIF", "NIE"].includes(documentTypes[guest.id]) && (
                      <div className="field">
                        <label htmlFor={`persona-${guest.id}-soporteDocumento`}>Soporte del documento</label>
                        <input
                          id={`persona-${guest.id}-soporteDocumento`}
                          name={`persona-${guest.id}-soporteDocumento`}
                          pattern={DOCUMENT_SUPPORT_PATTERNS[documentTypes[guest.id]]}
                          title={documentTypes[guest.id] === "NIF"
                            ? "Formato NIF: 3 letras y 6 dígitos (ejemplo: AAA111111)."
                            : "Formato NIE: E o C seguido de 8 dígitos (ejemplo: E00001111)."}
                          required
                          disabled={sending}
                        />
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            <div className="field">
              <label htmlFor={`persona-${guest.id}-pais`}>País de residencia</label>
              <select
                id={`persona-${guest.id}-pais`}
                name={`persona-${guest.id}-pais`}
                value={residenceCountries[guest.id] ?? "ESP"}
                onChange={(event) => setResidenceCountries((current) => ({ ...current, [guest.id]: event.target.value }))}
                required
                disabled={sending}
              >
                {countries.map(({ code, name }) => <option key={code} value={code}>{name} ({code})</option>)}
              </select>
            </div>
            <p className="form-note field--full">Indica al menos uno de estos datos de contacto: teléfono, teléfono adicional o correo electrónico.</p>
            {residenceCountries[guest.id] === "ESP" ? (
              <div className="field">
                <label htmlFor={`persona-${guest.id}-codigoMunicipio`}>Código de municipio (5 dígitos)</label>
                <input id={`persona-${guest.id}-codigoMunicipio`} name={`persona-${guest.id}-codigoMunicipio`} pattern="[0-9]{5}" inputMode="numeric" required disabled={sending} />
              </div>
            ) : (
              <div className="field">
                <label htmlFor={`persona-${guest.id}-nombreMunicipio`}>Nombre del municipio</label>
                <input id={`persona-${guest.id}-nombreMunicipio`} name={`persona-${guest.id}-nombreMunicipio`} required disabled={sending} />
              </div>
            )}
            {hasMinor && (
              <div className="field">
                <label htmlFor={`persona-${guest.id}-parentesco`}>Parentesco con el menor</label>
                <select id={`persona-${guest.id}-parentesco`} name={`persona-${guest.id}-parentesco`} required disabled={sending}>
                  <option value="">Selecciona el parentesco</option>
                  {relationships.map(({ code, name }) => (
                    <option key={code} value={code}>{name} ({code})</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </fieldset>
      ))}

      <div className="field field--full checkin-actions">
        <button
          className="btn btn--ghost"
          type="button"
          onClick={addGuest}
          disabled={sending}
        >
          Añadir viajero
        </button>
        <button className="btn btn--primary" type="submit" disabled={sending}>
          {sending ? "Enviando…" : "Enviar check-in"}
        </button>
        <p className="form-note">Se enviarán los datos del check-in al alojamiento.</p>
        {status === "success" && (
          <p className="form-status form-status--ok" role="status">
            Check-in enviado correctamente. Referencia: <span className="mono">{reference}</span>
          </p>
        )}
        {status === "error" && <p className="form-status form-status--error" role="alert">{errorMsg}</p>}
      </div>
    </form>
  );
}
