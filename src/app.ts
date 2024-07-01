import { Server } from "./presentation/server";
// import { AppRoutes } from "./presentation/routes";

async function main() {
  new Server().start();
}

main();
