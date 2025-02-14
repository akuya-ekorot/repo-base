"use client";

import { PropsWithChildren, type FC } from "react";
import type { StorageThreadType } from "@mastra/core";
import { useCreateThread } from "@/hooks/useCreateThread";

export const EnsureThread: FC<
  PropsWithChildren<{
    owner: string;
    repo: string;
    resourceId: string;
    threads: StorageThreadType[] | undefined;
  }>
> = ({ owner, repo, resourceId, threads, children }) => {
  useCreateThread({ owner, repo, resourceId, threads });

  return <>{children}</>;
};
