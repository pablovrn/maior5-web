import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Relationship = { code: string; name: string };

const parsedRelationships: Relationship[] = readFileSync(
  join(process.cwd(), "otros/relacion-parentes.md"),
  "utf8"
)
  .split(/\r?\n/)
  .flatMap((line) => {
    const match = line.match(/^([A-Z]{2})\s+(.+)$/);
    return match ? [{ code: match[1], name: match[2] }] : [];
  });

export const relationships = [
  ...parsedRelationships,
  ...(parsedRelationships.some(({ code }) => code === "OT") ? [] : [{ code: "OT", name: "Otro" }]),
];

export const relationshipCodes = new Set(relationships.map(({ code }) => code));
