// src/lib/sanity.client.ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "6zujr6k4", // tu projectId
  dataset: "production",
  apiVersion: "2025-08-19", // fecha de hoy para evitar warnings
  useCdn: true, // para lectura rápida (no ediciones)
});
