import type { Metadata } from "next";
import CheckInForm from "@/components/CheckInForm";
import { countries } from "@/app/lib/countries";
import municipalities from "@/app/lib/municipalities.json";
import { relationships } from "@/app/lib/relationships";

const municipalityNameCounts = new Map<string, number>();
for (const { name } of municipalities) {
  municipalityNameCounts.set(name, (municipalityNameCounts.get(name) ?? 0) + 1);
}

const municipalityOptions = [...municipalities]
  .sort((a, b) => a.name.localeCompare(b.name, "es") || a.code.localeCompare(b.code))
  .map(({ code, name }) => ({
    code,
    label: (municipalityNameCounts.get(name) ?? 0) > 1 ? `${name} (${code.slice(0, 2)})` : name,
  }));

export const metadata: Metadata = {
  title: "Check-in",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckInPage() {
  return (
    <section className="section section--stone checkin-page">
      <div className="wrap checkin-wrap">
        <header className="checkin-heading">
          <p className="eyebrow">Maior 5 · Verín</p>
          <h1>Formulario de check-in</h1>
          <p className="lede">
            Completa los datos de la estancia y de cada viajero.
          </p>
        </header>
        <CheckInForm
          countries={countries}
          municipalities={municipalityOptions}
          relationships={relationships}
        />
      </div>
    </section>
  );
}
