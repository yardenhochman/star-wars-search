import {
  Category,
  Film,
  Person,
  Planet,
  Species,
  Starship,
  Vehicle,
} from "../shared/types";

const BASE_URL = "https://swapi.dev/api";

type ResultsType<T extends Category> = T extends Category.PEOPLE
  ? Person[]
  : T extends Category.PLANETS
  ? Planet[]
  : T extends Category.STARSHIPS
  ? Starship[]
  : T extends Category.VEHICLES
  ? Vehicle[]
  : T extends Category.SPECIES
  ? Species[]
  : T extends Category.FILMS
  ? Film[]
  : never;

interface SWAPIBaseSearchResultResponse<T extends Category> {
  count: number;
  next: string;
  previous: string;
  results: ResultsType<T>;
}

export async function getMatchingEntity<T extends Category>(
  category: T,
  searchTerm?: string
) {
  let url = `${BASE_URL}/${category}`;
  if (searchTerm) {
    url += `?search=${searchTerm}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data as SWAPIBaseSearchResultResponse<T>;
}

export async function getStarWarsEntities(searchTerm: string) {
  const [people, planets, starships, vehicles, species, films] =
    await Promise.all([
      getMatchingEntity(Category.PEOPLE, searchTerm),
      getMatchingEntity(Category.PLANETS, searchTerm),
      getMatchingEntity(Category.STARSHIPS, searchTerm),
      getMatchingEntity(Category.VEHICLES, searchTerm),
      getMatchingEntity(Category.SPECIES, searchTerm),
      getMatchingEntity(Category.FILMS, searchTerm),
    ]);

  return { people, planets, starships, vehicles, species, films };
}
