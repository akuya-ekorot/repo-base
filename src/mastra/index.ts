import { Mastra } from "@mastra/core/mastra";

import { agent } from "./agent";

export const mastra = new Mastra({
  agents: { agent },
});
