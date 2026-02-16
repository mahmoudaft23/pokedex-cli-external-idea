import type { State } from "./state.js";

export async function commandCatch(state: State,pokemonName?: string): Promise<void> {
  if (!pokemonName) {
    console.log("Please provide a pokemon name");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

  
  const rawChance = 0.5 - pokemon.base_experience / 500;
  const maxmem=Math.max(0.05, rawChance)
  const minnmem = Math.min(0.9, maxmem);

  const roll = Math.random();
  if (roll < minnmem) {
    state.pokedex[pokemon.name] = pokemon;
    console.log(`${pokemon.name} was caught!`);
  } else {
    console.log(`${pokemon.name} escaped!`);
  }
}
