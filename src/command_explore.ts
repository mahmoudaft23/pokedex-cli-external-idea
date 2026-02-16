import type { State } from "./state.js";

export async function commandExplore(state: State, areaName?: string): Promise<void> {
  if (!areaName) {
    console.log("Please provide a location area name");
    return;
  }

  console.log(`Exploring ${areaName}...`);

  const area = await state.pokeapi.fetchLocationArea(areaName);

  console.log("Found Pokemon:");
  for (const encounter of area.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
