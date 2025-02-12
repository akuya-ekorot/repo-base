import { google } from "@ai-sdk/google";
import { Agent } from "@mastra/core/agent";

import { instructions } from "./instructions";
import { getFilePaths } from "../tools/getFilePaths";

export const agent = new Agent({
  name: "agent",
  instructions,
  model: google("gemini-2.0-flash-001"),
  tools: {
    getFilePaths,
  },
});
