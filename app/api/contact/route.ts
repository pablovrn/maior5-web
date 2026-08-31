import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const nombre = String(body.nombre ?? "").trim();
  const email = String(body.email ?? "").trim();
  const apartamento = String(body.apartamento ?? "").trim();
  const mensaje = String(body.mensaje ?? "").trim();

  if (!nombre || !email || !mensaje) {
    return NextResponse.json({ ok: false, error: "Falta el nombre, el email o el mensaje." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: "El email no parece válido." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error(
      "Formulario de contacto: faltan variables de entorno SMTP_HOST, SMTP_USER, SMTP_PASS o CONTACT_TO_EMAIL."
    );
    return NextResponse.json(
      { ok: false, error: "El formulario aún no está configurado. Llámanos o escríbenos directamente por email." },
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
      replyTo: email,
      subject: `Consulta de ${nombre} — Maior 5 Apartamentos`,
      text: [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        apartamento ? `Apartamento de interés: ${apartamento}` : null,
        "",
        mensaje,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error enviando el formulario de contacto:", error);
    return NextResponse.json(
      { ok: false, error: "No se ha podido enviar el mensaje. Inténtalo de nuevo en unos minutos." },
      { status: 500 }
    );
  }
}
