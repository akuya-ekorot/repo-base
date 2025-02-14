"use client";

import { useEffect, type FC } from "react";
import type { StorageThreadType } from "@mastra/core";
import { useAction } from "next-safe-action/hooks";
import { createThread } from "@/actions/createThread";

export const ResourceThreads: FC<{
  owner: string;
  repo: string;
  resourceId: string;
  threads: StorageThreadType[] | undefined;
}> = ({ owner, repo, resourceId, threads }) => {
  const { execute } = useAction(createThread);

  /**
   * BUG: In development mode, this fires twice and creates two threads
   * Doesn't happen in production environment
   */
  useEffect(() => {
    if (!threads || !threads.length) {
      execute({ owner, repo, resourceId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {threads?.map((thread) => (
        <pre key={thread.id}>
          <code>{JSON.stringify(thread, null, 2)}</code>
        </pre>
      ))}
    </div>
  );
};
