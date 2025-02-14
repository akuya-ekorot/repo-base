"use client";

import type { FC } from "react";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { Button } from "../ui/button";
import { newThreadWithRepo } from "@/actions/newThreadWithRepo";

interface NewThreadWithRepoButtonProps {
  owner: string;
  repo: string;
  resourceId: string;
}

export const NewThreadWithRepoButton: FC<NewThreadWithRepoButtonProps> = ({
  owner,
  repo,
  resourceId,
}) => {
  const { execute, isPending } = useAction(newThreadWithRepo);
  return (
    <Button
      disabled={isPending}
      onClick={() => execute({ owner, repo, resourceId })}
    >
      <Plus className="w-4 h-4 mr-2" />
      New chat with repo
    </Button>
  );
};
