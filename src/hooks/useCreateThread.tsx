"use client";

import { createThread } from "@/actions/createThread";
import { StorageThreadType } from "@mastra/core";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";

interface UseCreateThreadProps {
  owner: string;
  repo: string;
  resourceId: string;
  threads: StorageThreadType[] | undefined;
}
export const useCreateThread = (props: UseCreateThreadProps) => {
  const { threads, owner, repo, resourceId } = props;

  const { execute } = useAction(createThread);

  /**
   * BUG: In development mode, this fires twice and creates two threads
   * Doesn't happen in production environment
   */
  useEffect(() => {
    if (!threads || !threads.length) {
      execute({ owner, repo, resourceId });
    }
  }, [execute, owner, repo, resourceId, threads]);
};
