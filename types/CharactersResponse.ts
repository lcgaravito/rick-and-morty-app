import { Character } from "./Character";

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next?: string | null;
    prev?: string | null;
  };
  results: Character[];
}
