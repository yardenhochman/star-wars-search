export enum Category {
  PEOPLE = "people",
  PLANETS = "planets",
  STARSHIPS = "starships",
  VEHICLES = "vehicles",
  SPECIES = "species",
  FILMS = "films",
}

export type StarWarsEntity =
  | Person
  | Planet
  | Starship
  | Vehicle
  | Species
  | Film;

export interface Person {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  eye_color: string;
  created: string;
}

export interface Planet {
  name: string;
}

export interface Starship {
  name: string;
}

export interface Species {
  name: string;
}

export interface Film {
  title: string;
}

export interface Vehicle {
  title: string;
}
