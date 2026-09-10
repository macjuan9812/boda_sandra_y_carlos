import type { Config } from "@netlify/functions";
import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { rsvps } from "../../db/schema.js";

const HOST_PIN = "9812";

export default async (req: Request) => {
  if (req.method === "POST") {
    const body = await req.json();
    const nombre = String(body.nombre || "").trim();
    const asistira = String(body.asistira || "").trim();
    const comentario = String(body.comentario || "").trim();

    if (!nombre || !asistira) {
      return Response.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    const [inserted] = await db
      .insert(rsvps)
      .values({ nombre, asistira, comentario })
      .returning();

    return Response.json(inserted, { status: 201 });
  }

  if (req.method === "GET") {
    const pin = new URL(req.url).searchParams.get("pin");
    if (pin !== HOST_PIN) {
      return Response.json({ error: "PIN incorrecto" }, { status: 401 });
    }

    const entries = await db.select().from(rsvps).orderBy(desc(rsvps.createdAt));
    const totalSi = entries.filter((e) => e.asistira === "Sí").length;
    const totalNo = entries.filter((e) => e.asistira !== "Sí").length;

    return Response.json({ entries, totalSi, totalNo });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/rsvp",
};
