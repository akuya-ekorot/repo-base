import { Logger, Mastra } from "@mastra/core";
import { documentationProcessingWorkflow } from "./workflows/documentation-processing";
import { PgMemory } from "@mastra/memory";
import { PgVector } from "@mastra/vector-pg";
import { chatAgent } from "./agents/chat-agent";
import { improvedDocsProcessing } from "./workflows/improved-docs-processing";

export const pgVector = new PgVector(process.env.DATABASE_URL!);

export const mastra = new Mastra({
  //@ts-expect-error error with logger compatibility
  vectors: { pgVector },
  //@ts-expect-error error with logger compatibility
  memory: new PgMemory({ connectionString: process.env.DATABASE_URL! }),
  logger: new Logger({
    level: process.env.NODE_ENV === "development" ? "debug" : "info",
  }),
  agents: {
    chatAgent,
  },
  workflows: {
    documentationProcessingWorkflow,
    improvedDocsProcessing,
  },
});
