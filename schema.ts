import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const rsvps = pgTable("rsvps", {
  id: serial().primaryKey(),
  nombre: text().notNull(),
  asistira: text().notNull(),
  comentario: text().notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
