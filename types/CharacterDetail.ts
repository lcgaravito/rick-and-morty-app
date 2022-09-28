import { Character } from "./Character";

export interface CharacterDetail extends Character {
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}
