import { PokemonApiResponse } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function fetchPokemonList(
  searchTerm: string,
  limit: number = 10,
  offset: number = 0,
): Promise<PokemonApiResponse> {
  const trimmedTerm = searchTerm.trim().toLowerCase();

  let url = `${BASE_URL}?limit=${limit}&offset=${offset}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: PokemonApiResponse = await response.json();

  if (!trimmedTerm) {
    return data;
  }

  const filtered = data.results.filter((item) =>
    item.name.includes(trimmedTerm),
  );

  return {
    ...data,
    results: filtered,
  };
}
