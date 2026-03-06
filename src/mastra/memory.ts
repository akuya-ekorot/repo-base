import { Memory } from "@mastra/memory";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { fastembed } from "@mastra/fastembed";

if (!process.env.DB_URL) throw new Error("DB_URL required");

// export const storage = new PostgresStore({
//   connectionString: process.env.DB_URL,
// });
//
const STORAGE_URL = "file:mastra.db";
export const storage = new LibSQLStore({
  url: STORAGE_URL,
});

export const vector = new LibSQLVector({
  connectionUrl: STORAGE_URL,
});

export const memory = new Memory({
  storage,
  vector,
  embedder: fastembed,
  options: {
    semanticRecall: true,
    lastMessages: 10,
    threads: {
      generateTitle: true,
    },
    workingMemory: {
      enabled: true,
    },
  },
});
