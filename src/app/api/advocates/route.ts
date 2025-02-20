import { PgSelectBase } from "drizzle-orm/pg-core";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { eq, exists, ilike, or, sql } from "drizzle-orm";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchTerm = url.searchParams.get("searchTerm");

  const query = db.select().from(advocates) as PgSelectBase<
    "advocates",
    any,
    any
  >;

  if (searchTerm) {
    const subQuery = sql`
    (SELECT * FROM jsonb_array_elements_text(CASE WHEN jsonb_typeof(${
      advocates.specialties
    }::jsonb) = 'array' THEN ${
      advocates.specialties
    }::jsonb ELSE jsonb_build_array(${
      advocates.specialties
    }::jsonb) END) AS elem WHERE elem ILIKE ${"%" + searchTerm + "%"})
  `;

    query.where(
      or(
        ilike(advocates.firstName, `%${searchTerm}%`),
        ilike(advocates.lastName, `%${searchTerm}%`),
        ilike(advocates.city, `%${searchTerm}%`),
        ilike(advocates.degree, `%${searchTerm}%`),
        eq(advocates.yearsOfExperience, Number(searchTerm) || 0),
        exists(subQuery)
      )
    );
  }

  const data = await query;

  return Response.json({ data });
}
