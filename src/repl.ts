import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

export function startREPL(state: State) {
  const { rl } = state;

  rl.prompt();

  rl.on("line", (line) => {
    (async () => {
      const words = cleanInput(line);

      if (words.length === 0) {
        rl.prompt();
        return;
      }

         const args = words.slice(1);
      const command = state.commands[words[0]];
       
   
      if (!command) {
        console.log("Unknown command");
        rl.prompt();
        return;
      }

      try {
          await command.callback(state, ...(words.slice(1) as string[]));

      } catch (err) {
        console.log("Error:", err);
      }

      rl.prompt();
    })();
  });
}
