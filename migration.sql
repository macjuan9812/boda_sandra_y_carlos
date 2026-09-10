CREATE TABLE "rsvps" (
	"id" serial PRIMARY KEY,
	"nombre" text NOT NULL,
	"asistira" text NOT NULL,
	"comentario" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
