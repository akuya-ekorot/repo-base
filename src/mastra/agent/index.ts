import { Agent } from "@mastra/core/agent";
import { storage } from "../memory";
import { instructions } from "./instructions";
import { getFilePaths } from "../tools/getFilePaths";
import { getFileContent } from "../tools/getFileContent";
import { getRepositoryIssues } from "../tools/getRepositoryIssues";
import { getRepositoryCommits } from "../tools/getRepositoryCommits";
import { getRepositoryPullRequests } from "../tools/getRepositoryPullRequests";
import { Memory } from "@mastra/memory";
import { openrouter } from "@openrouter/ai-sdk-provider";

export const agent = new Agent({
  name: "agent",
  instructions,
  memory: new Memory({
    storage,
  }),
  model: openrouter("openai/gpt-5"),
  tools: {
    getFilePaths,
    getFileContent,
    getRepositoryIssues,
    getRepositoryCommits,
    getRepositoryPullRequests,
  },
});
