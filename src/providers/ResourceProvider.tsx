"use client";

import { createResourceId } from "@/actions/createResourceIdAction";
import { useAction } from "next-safe-action/hooks";
import { FC, PropsWithChildren, useEffect } from "react";

export const ResourceProvider: FC<
  PropsWithChildren<{ resourceId: string | undefined }>
> = ({ children, resourceId }) => {
  const { execute } = useAction(createResourceId);

  useEffect(() => {
    if (!resourceId) {
      execute();
    }
  }, [execute, resourceId]);

  if (!resourceId) return null;

  return <>{children}</>;
};
