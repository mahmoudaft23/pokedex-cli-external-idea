import { createInterface, type Interface } from "readline";
import type { REPLServer } from "repl";
import { getCommands ,CLICommand} from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

import type { Pokemon } from "./pokeapi.js";
export type State = {
  repl: REPLServer | null;
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
   pokedex: Record<string, Pokemon>;
  cache: Cache;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
const cache = new Cache(30_000);
  const commands = getCommands();
  const pokeapi = new PokeAPI(cache);

  return {
     repl: null,
    rl,
    commands,
    pokeapi,
    nextLocationsURL: null, 
    prevLocationsURL: null,
      pokedex: {},
      cache,
  };
}
