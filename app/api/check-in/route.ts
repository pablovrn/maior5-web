import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { countryCodes } from "@/app/lib/countries";
import { relationshipCodes } from "@/app/lib/relationships";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const PAYMENT_TYPES = ["DESTI", "EFECT", "TARJT", "PLATF", "TRANS", "MOVIL", "TREG", "OTRO"];
const DOCUMENT_TYPES = ["NIF", "NIE", "PAS", "OTRO"];

type Guest = {
  nombre: string;
  apellido1: string;
  apellido2: string;
  tipoDocumento: string;
  numeroDocumento: string;
  soporteDocumento: string;
  fechaNacimiento: string;
  nacionalidad: string;
  direccion: string;
  codigoMunicipio: string;
  nombreMunicipio: string;
  codigoPostal: string;
  pais: string;
  telefono: string;
  telefono2: string;
  correo: string;
  parentesco: string;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function madridOffset(date: string, time = "12:00") {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(utcDate);
  const part = (type: string) => Number(parts.find((entry) => entry.type === type)?.value);
  const madridAsUtc = Date.UTC(part("year"), part("month") - 1, part("day"), part("hour"), part("minute"));
  const offsetMinutes = (madridAsUtc - utcDate.getTime()) / 60_000;
  const sign = offsetMinutes < 0 ? "-" : "+";
  const absoluteOffset = Math.abs(offsetMinutes);
  return `${sign}${String(Math.floor(absoluteOffset / 60)).padStart(2, "0")}:${String(absoluteOffset % 60).padStart(2, "0")}`;
}

function xmlDate(value: string) {
  return `${value}${madridOffset(value)}`;
}

function xmlStayDate(value: string) {
  return `${value}T11:00:00${madridOffset(value, "11:00")}`;
}

function checkDate(value: string, pattern: RegExp) {
  if (!pattern.test(value)) return false;
  const date = value.slice(0, 10);
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return false;
  return true;
}

function isMinor(birthDate: string, today: string) {
  return ageOn(birthDate, today) < 18;
}

function ageOn(birthDate: string, today: string) {
  const [birthYear, birthMonth, birthDay] = birthDate.split("-").map(Number);
  const [year, month, day] = today.split("-").map(Number);
  return year - birthYear - (month < birthMonth || (month === birthMonth && day < birthDay) ? 1 : 0);
}

function madridDate(value: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);
  const part = (type: string) => parts.find((entry) => entry.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function makeReference(value: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(value);
  const part = (type: string) => parts.find((entry) => entry.type === type)?.value ?? "";
  return `${part("year")}${part("month")}${part("day")}${part("hour")}${part("minute")}`;
}

function xmlTag(name: string, value: string) {
  return `        <${name}>${escapeXml(value)}</${name}>`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const titularReserva = text(body.titularReserva);
  const fechaEntrada = text(body.fechaEntrada);
  const fechaSalida = text(body.fechaSalida);
  const tipoPago = text(body.tipoPago);

  if (
    !checkDate(fechaEntrada, DATE_PATTERN) ||
    !checkDate(fechaSalida, DATE_PATTERN) ||
    fechaSalida <= fechaEntrada
  ) {
    return NextResponse.json({ ok: false, error: "Revisa las fechas y horas de la estancia." }, { status: 400 });
  }
  if (!PAYMENT_TYPES.includes(tipoPago)) {
    return NextResponse.json({ ok: false, error: "Selecciona un tipo de pago válido." }, { status: 400 });
  }
  if (!titularReserva || titularReserva.length > 200) {
    return NextResponse.json({ ok: false, error: "Indica el nombre del titular de la reserva." }, { status: 400 });
  }

  if (!Array.isArray(body.personas) || body.personas.length < 1 || body.personas.length > 20) {
    return NextResponse.json({ ok: false, error: "Debe haber entre 1 y 20 viajeros." }, { status: 400 });
  }

  const personas: Guest[] = [];
  for (const rawGuest of body.personas) {
    if (!rawGuest || typeof rawGuest !== "object") {
      return NextResponse.json({ ok: false, error: "Los datos de un viajero no son válidos." }, { status: 400 });
    }
    const guest: Guest = {
      nombre: text(rawGuest.nombre),
      apellido1: text(rawGuest.apellido1),
      apellido2: text(rawGuest.apellido2),
      tipoDocumento: text(rawGuest.tipoDocumento),
      numeroDocumento: text(rawGuest.numeroDocumento).toUpperCase(),
      soporteDocumento: text(rawGuest.soporteDocumento).toUpperCase(),
      fechaNacimiento: text(rawGuest.fechaNacimiento),
      nacionalidad: text(rawGuest.nacionalidad),
      direccion: text(rawGuest.direccion),
      codigoMunicipio: text(rawGuest.codigoMunicipio),
      nombreMunicipio: text(rawGuest.nombreMunicipio),
      codigoPostal: text(rawGuest.codigoPostal),
      pais: text(rawGuest.pais),
      telefono: text(rawGuest.telefono),
      telefono2: text(rawGuest.telefono2),
      correo: text(rawGuest.correo),
      parentesco: text(rawGuest.parentesco),
    };
    if (
      !guest.nombre ||
      !guest.apellido1 ||
      (guest.tipoDocumento && !DOCUMENT_TYPES.includes(guest.tipoDocumento)) ||
      !checkDate(guest.fechaNacimiento, DATE_PATTERN) ||
      !countryCodes.has(guest.nacionalidad) ||
      !guest.direccion ||
      !/^\d{5}$/.test(guest.codigoPostal) ||
      !countryCodes.has(guest.pais) ||
      (!guest.telefono && !guest.telefono2 && !guest.correo) ||
      (guest.correo && !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(guest.correo))
    ) {
      return NextResponse.json({ ok: false, error: "Revisa los campos obligatorios de cada viajero." }, { status: 400 });
    }
    if (guest.pais === "ESP" ? !/^\d{5}$/.test(guest.codigoMunicipio) : !guest.nombreMunicipio) {
      return NextResponse.json(
        { ok: false, error: guest.pais === "ESP" ? "El código de municipio debe tener 5 dígitos." : "Indica el municipio de residencia." },
        { status: 400 }
      );
    }
    personas.push(guest);
  }

  const submittedAt = new Date();
  const submissionDate = madridDate(submittedAt);
  if (personas.some(({ fechaNacimiento }) => fechaNacimiento > submissionDate)) {
    return NextResponse.json({ ok: false, error: "La fecha de nacimiento no puede ser futura." }, { status: 400 });
  }
  for (const guest of personas) {
    const age = ageOn(guest.fechaNacimiento, submissionDate);
    const requiresDocument = age >= 18 || (age > 14 && guest.nacionalidad === "ESP");
    if (
      (requiresDocument && !DOCUMENT_TYPES.includes(guest.tipoDocumento)) ||
      (guest.tipoDocumento === "NIF" && !guest.apellido2) ||
      (guest.tipoDocumento && !guest.numeroDocumento) ||
      (["NIF", "NIE"].includes(guest.tipoDocumento) && !guest.soporteDocumento) ||
      (guest.tipoDocumento === "NIF" && !/^\d{8}[A-Z]$/.test(guest.numeroDocumento)) ||
      (guest.tipoDocumento === "NIE" && !/^[XYZ]\d{7}[A-Z]$/.test(guest.numeroDocumento)) ||
      (guest.tipoDocumento === "NIF" && !/^[A-Z]{3}\d{6}$/.test(guest.soporteDocumento)) ||
      (guest.tipoDocumento === "NIE" && !/^[EC]\d{8}$/.test(guest.soporteDocumento))
    ) {
      return NextResponse.json(
        { ok: false, error: "Revisa los formatos del documento, el soporte y los datos obligatorios según la edad y nacionalidad." },
        { status: 400 }
      );
    }
  }
  const hasMinor = personas.some(({ fechaNacimiento }) => isMinor(fechaNacimiento, submissionDate));
  if (hasMinor && personas.some(({ parentesco }) => !relationshipCodes.has(parentesco))) {
    return NextResponse.json(
      { ok: false, error: "Indica el parentesco de cada viajero cuando hay menores de edad." },
      { status: 400 }
    );
  }
  const reference = makeReference(submittedAt);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<ns2:peticion xmlns:ns2="http://www.neg.hospedajes.mir.es/altaParteHospedaje">',
    "  <solicitud>",
    "    <codigoEstablecimiento>0000243196</codigoEstablecimiento>",
    "    <comunicacion>",
    "      <contrato>",
    `        <referencia>${reference}</referencia>`,
    `        <fechaContrato>${xmlDate(submissionDate)}</fechaContrato>`,
    `        <fechaEntrada>${xmlStayDate(fechaEntrada)}</fechaEntrada>`,
    `        <fechaSalida>${xmlStayDate(fechaSalida)}</fechaSalida>`,
    `        <numPersonas>${personas.length}</numPersonas>`,
    "        <numHabitaciones>1</numHabitaciones>",
    "        <internet>true</internet>",
    "        <pago>",
    `          <tipoPago>${tipoPago}</tipoPago>`,
    "        </pago>",
    "      </contrato>",
    ...personas.flatMap((guest) => [
      "      <persona>",
      "        <rol>VI</rol>",
      xmlTag("nombre", guest.nombre),
      xmlTag("apellido1", guest.apellido1),
      xmlTag("apellido2", guest.apellido2),
      ...(guest.tipoDocumento
        ? [
            xmlTag("tipoDocumento", guest.tipoDocumento),
            xmlTag("numeroDocumento", guest.numeroDocumento),
            ...(guest.soporteDocumento ? [xmlTag("soporteDocumento", guest.soporteDocumento)] : []),
          ]
        : []),
      xmlTag("fechaNacimiento", xmlDate(guest.fechaNacimiento)),
      "         <direccion>",
      xmlTag("direccion", guest.direccion),
      guest.pais === "ESP"
        ? xmlTag("codigoMunicipio", guest.codigoMunicipio)
        : xmlTag("nombreMunicipio", guest.nombreMunicipio),
      xmlTag("codigoPostal", guest.codigoPostal),
      xmlTag("pais", guest.pais),
      "         </direccion>",
      xmlTag("telefono", guest.telefono),
      xmlTag("telefono2", guest.telefono2),
      xmlTag("correo", guest.correo),
      ...(hasMinor ? [xmlTag("parentesco", guest.parentesco)] : []),
      "      </persona>",
    ]),
    "    </comunicacion>",
    "  </solicitud>",
    "</ns2:peticion>",
  ].join("\n");

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error(
      "Check-in: faltan variables de entorno SMTP_HOST, SMTP_USER, SMTP_PASS o CONTACT_TO_EMAIL."
    );
    return NextResponse.json(
      { ok: false, error: "El envío aún no está configurado. Contacta con el alojamiento." },
      { status: 500 }
    );
  }

  try {
    const port = Number(SMTP_PORT ?? 587);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Web Maior 5 Apartamentos" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      ...(personas[0].correo ? { replyTo: personas[0].correo } : {}),
      subject: `Check-in ${reference} — Maior 5 Apartamentos`,
      text: [
        `Titular de la reserva: ${titularReserva}`,
        `Referencia: ${reference}`,
        "",
        "Se adjunta el XML del check-in.",
      ].join("\n"),
      attachments: [
        {
          filename: `check-in-${reference}.xml`,
          content: xml,
          contentType: "application/xml; charset=utf-8",
        },
      ],
    });

    return NextResponse.json({ ok: true, reference });
  } catch (error) {
    console.error("Error enviando el check-in:", error);
    return NextResponse.json(
      { ok: false, error: "No se ha podido enviar el check-in. Inténtalo de nuevo en unos minutos." },
      { status: 500 }
    );
  }
}
