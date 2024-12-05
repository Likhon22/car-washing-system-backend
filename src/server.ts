import mongoose from "mongoose";
import { app } from "./app";
import config from "./app/config";
import { Server } from "http";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Database connected on port ${config.port}!`);
    });
  } catch (error) {
    console.error("Error occurred: ", error);
  }
}
main();

process.on("unhandledRejection", (reason, promise) => {
  if (server) {
    console.error("Unhandled Rejection at promise", promise, "reason:", reason);
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", err => {
  console.error("Uncaught Exception thrown", err);
  process.exit(1);
});
