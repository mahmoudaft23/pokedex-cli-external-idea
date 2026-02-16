import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
  console.log("Your Pokedex:");

  const names = Object.keys(state.pokedex);

  if (names.length === 0) {
     console.log(`There is no pokemon in your pokedex yet. Use the 'catch' command to catch some!`);
    return;
  }

  for (const name of names) {
    console.log(` - ${name}`);
  }
}