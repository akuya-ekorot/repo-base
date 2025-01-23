"use server";

import { z } from "zod";
import { actionClient } from ".";
import { repos } from "@/db/schema/repos";
import { eq, sql } from "drizzle-orm";
import { sessionRepos } from "@/db/schema/session-repos";

const inputSchema = z.object({
  repository: z.string(),
  sessionId: z.string().uuid(),
});

const transformedSchema = inputSchema.transform(
  ({ repository }, transformCtx) => {
    const splitInput = repository.split("/");
    if (splitInput.length !== 2) {
      transformCtx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Input should be in the format {owner}/{repo-name} e.g `facebook/react`",
      });
      return z.NEVER;
    }
    return splitInput;
  },
);

export const validateRepositoryAction = actionClient
  .schema(inputSchema)
  .action(async ({ ctx, parsedInput }) => {
    const [owner, repo] = transformedSchema.parse(parsedInput);
    const res = await ctx.gh.rest.repos.get({ owner, repo });
    const repoName = res.data.full_name;

    // check if repo is indexed
    const indexedRepo = await ctx.db.query.repos.findFirst({
      where: (t, h) => h.eq(t.name, repoName),
      with: {
        sessionRepos: true,
      },
    });

    if (indexedRepo) {
      await ctx.db.transaction(async (tx) => {
        // increase popularity rank of repo
        await tx
          .update(repos)
          .set({ rank: sql`${repos.rank} + 1` })
          .where(eq(repos.name, repoName));

        // associate repo with current session
        const isSessionRepo = indexedRepo.sessionRepos.some(
          (s) => s.sessionId === parsedInput.sessionId,
        );

        if (!isSessionRepo) {
          await tx.insert(sessionRepos).values({
            sessionId: parsedInput.sessionId,
            repoId: indexedRepo.id,
          });
        }
      });
    } else {
      await ctx.db.transaction(async (tx) => {
        // save repo details
        const [insertedRepo] = await tx
          .insert(repos)
          .values({
            name: repoName,
            description: res.data.description,
            language: res.data.language,
            stars: res.data.stargazers_count,
            forks: res.data.forks,
            ownerAvatar: res.data.owner.avatar_url,
            rank: 1,
          })
          .returning({ repoId: repos.id });

        await tx.insert(sessionRepos).values({
          repoId: insertedRepo.repoId,
          sessionId: parsedInput.sessionId,
        });
      });
    }

    /*TODO:
     * 2. Trigger background processing jobs
     *  - Code understanding job
     *  - Documentation intelligence job
     *  - Development history
     *  - Knowledge Graph job
     */

    if (res.status === 200) return res.data;
    throw new Error(res.status);
  });
