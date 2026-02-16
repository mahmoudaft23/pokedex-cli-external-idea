import { initState } from "./state.js";
import { startREPL } from "./repl.js";
import { startREPLServer } from "./replserver.js";
function main() {
  const state = initState();
  startREPLServer(state);
}

main();
