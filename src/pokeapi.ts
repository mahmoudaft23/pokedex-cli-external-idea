import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

   constructor(cache: Cache) {
    this.#cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL
      ? pageURL
      : `${PokeAPI.baseURL}/location-area?limit=20&offset=0`;

   
    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached !== undefined && cached !== null) {
     
      return cached;
    }

    const response = await fetch(url, { method: "GET" });
    const final: ShallowLocations = await response.json();

    this.#cache.add(url, final);
    return final;
  }




  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location/${locationName}`;

    
    const cached = this.#cache.get<Location>(url);
    if (cached !== undefined && cached !== null) {
     
      return cached;
    }

    
    const response = await fetch(url, { method: "GET" });
    const final: Location = await response.json();

    this.#cache.add(url, final);
    return final;
  }




async fetchLocationArea(areaName: string): Promise<LocationArea> {
  const url = `${PokeAPI.baseURL}/location-area/${areaName}`;

  const cached = this.#cache.get<LocationArea>(url);
  if (cached !== undefined) {
    return cached;
  }

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Failed to fetch location-area: ${areaName}`);
  }

  const final: LocationArea = await response.json();

  this.#cache.add(url, final);
  return final;
}




async fetchPokemon(pokemonName: string): Promise<Pokemon> {
  const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

  const cached = this.#cache.get<Pokemon>(url);
  if (cached) return cached;

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon: ${pokemonName}`);
  }


  const final: Pokemon = await response.json();
  this.#cache.add(url, final);
  return final;
}



  
  stop(): void {
    this.#cache.stopReapLoop();
  }
}

export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  types: Array<{
    type: { name: string };
  }>;
};


export type LocationArea = {
  id: number;
  name: string;
  pokemon_encounters: Array<{
    pokemon: { name: string; url: string };
  }>;
};




export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

export type Location = {
  id: number;
  name: string;
  region: { name: string; url: string } | null;
  areas: Array<{ name: string; url: string }>;
};
