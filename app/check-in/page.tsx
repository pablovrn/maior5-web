import type { Metadata } from "next";
import CheckInForm from "@/components/CheckInForm";
import { countries } from "@/app/lib/countries";
import { relationships } from "@/app/lib/relationships";

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
        <CheckInForm countries={countries} relationships={relationships} />
      </div>
    </section>
  );
}
