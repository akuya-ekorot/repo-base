"use server";

import { z } from "zod";
import { actionClient } from ".";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const listThreadsOrCreateNewThread = actionClient
  .metadata({ actionName: "listThreadsOrCreateNewThread" })
  .schema(
    z.object({
      owner: z.string(),
      repo: z.string(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const { owner, repo } = parsedInput;
    const resourceId = (await cookies()).get("resourceId")?.value;

    if (!resourceId) throw new Error("No resourceId available to get thread");

    const resourceThreads = await ctx.memory.getThreadsByResourceId({
      resourceId,
    });

    const threads = resourceThreads?.filter(
      (thread) =>
        thread.metadata?.owner === owner && thread.metadata?.repo === repo,
    );

    if (threads) {
      redirect(`/${owner}/${repo}`);
    }

    const thread = await ctx.memory.createThread({
      resourceId,
      metadata: { owner, repo },
    });

    if (thread) {
      redirect(`/${owner}/${repo}/${thread?.id}`);
    }

    throw new Error("Could not create thread");
  });
