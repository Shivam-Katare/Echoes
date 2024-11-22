import { postgresql } from "@hypermode/modus-sdk-as"

@json
class Word {
  id!: number;
  created_at!: string;
  word!: string;
  difficulty!: string;
}

export function getWords(difficulty: string): Word[] {
  const query = "SELECT * FROM words WHERE difficulty = $1";
  const params = new postgresql.Params();
  params.push(difficulty);

  const response = postgresql.query<Word>("supabase-db", query, params);
  return response.rows;
}