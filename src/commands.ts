import type { State } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
type CommandCallback = (state: State, ...args: string[]) => Promise<void>;
export type CLICommand = {
  name: string;
  description: string;
  callback: CommandCallback;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Displays the names of 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Explore a specific location area",
      callback: commandExplore,
    },
    catch: {
  name: "catch",
  description: "Catch a pokemon",
  callback: commandCatch,
},
inspect: {  
  name: "inspect",
  description: "Inspect a caught pokemon",
  callback: commandInspect,
},
pokedex: {
  name: "pokedex",
  description: "List all caught pokemon",
  callback: commandPokedex,
},
  };
}
