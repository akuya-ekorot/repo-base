"use server";

import { z } from "zod";
import { actionClient } from ".";
import { redirect } from "next/navigation";

export const createThread = actionClient
  .metadata({ actionName: "createThread" })
  .schema(
    z.object({ owner: z.string(), repo: z.string(), resourceId: z.string() }),
  )
  .action(async ({ ctx, parsedInput: { owner, repo, resourceId } }) => {
    const thread = await ctx.mastra.memory?.createThread({
      resourceId,
      metadata: { owner, repo },
    });

    if (!thread) throw new Error("Could not create thread");

    redirect(`/${owner}/${repo}/${thread.id}`);
  });
