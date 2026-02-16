import repl, { type REPLServer } from "repl";
import type { State } from "./state.js";
import { cleanInput } from "./repl.js"
import { getCommands ,CLICommand} from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";
import type { Pokemon } from "./pokeapi.js";
export function startREPLServer(state: State) {
  const server: REPLServer = repl.start({
    prompt: "Pokedex > ",
    terminal: true,
    ignoreUndefined: true,
   
    completer: (line: string) => {
      const cmdNames = Object.keys(state.commands);
      const hits = cmdNames.filter((c) => c.startsWith(line.toLowerCase()));
      return [hits.length ? hits : cmdNames, line];
    },
  });

    state.repl = server;


  server.on("line", (line) => {
    (async () => {
      const words = cleanInput(line);

      if (words.length === 0) {
        server.displayPrompt();
        return;
      }

      const commandName = words[0];
      const command = state.commands[commandName];

      if (!command) {
        console.log("Unknown command");
        server.displayPrompt();
        return;
      }

      try {
        await command.callback(state, ...(words.slice(1) as string[]));
      } catch (err) {
        console.log("Error:", err);
      }

      server.displayPrompt();
    })();
  });

  
  
}