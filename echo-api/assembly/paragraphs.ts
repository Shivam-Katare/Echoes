import { postgresql } from "@hypermode/modus-sdk-as";

@json
class Paragraph {
  id!: number;
  created_at!: string;
  para!: string;
  difficulty!: string;
}

export function getParas(): Paragraph[] {
  const query = "SELECT * FROM paragraphs";

  const response = postgresql.query<Paragraph>("supabase-db", query);
  return response.rows;
}