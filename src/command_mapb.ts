import type { State } from "./state.js";

export async function commandMapBack(state: State): Promise<void> {
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }

  const data = await state.pokeapi.fetchLocations(state.prevLocationsURL);

  state.nextLocationsURL = data.next;
  state.prevLocationsURL = data.previous;

  for (const item of data.results) {
    console.log(item.name);
  }
}
