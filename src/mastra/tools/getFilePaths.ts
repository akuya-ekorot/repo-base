import { Tool } from "@mastra/core/tools";
import { Octokit } from "octokit";
import { z } from "zod";

export const getFilePaths = new Tool({
  id: "getFilePaths",
  description: "Get all file paths from the GitHub repository",
  inputSchema: z.object({
    owner: z.string(),
    repo: z.string(),
    tree_sha: z.string(),
  }),
  outputSchema: z.array(z.string()),
  execute: async ({ context }) => {
    const { owner, repo, tree_sha } = context;

    const gh = new Octokit();

    const getTreeResponse = await gh.rest.git.getTree({
      owner,
      repo,
      recursive: "true",
      tree_sha,
    });

    return getTreeResponse.data.tree
      .map((file) => file.path)
      .filter(Boolean) as string[];
  },
});
