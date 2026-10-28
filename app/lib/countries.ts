import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Country = { code: string; name: string };

export const countries: Country[] = readFileSync(
  join(process.cwd(), "otros/iso-alf-3.md"),
  "utf8"
)
  .split(/\r?\n/)
  .flatMap((line) => {
    const match = line.match(/^([A-Z]{3})\s+(.+)$/);
    return match ? [{ code: match[1], name: match[2] }] : [];
  });

export const countryCodes = new Set(countries.map(({ code }) => code));
