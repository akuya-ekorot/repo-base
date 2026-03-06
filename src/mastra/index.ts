import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";

import { agent } from "./agent";
import { storage } from "./memory";

const logger = new PinoLogger({
  level: process.env.NODE_ENV !== "production" ? "debug" : "warn",
});

export const mastra = new Mastra({
  agents: { agent },
  logger,
  storage,
});
