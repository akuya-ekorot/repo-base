"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import ToolUIWrapper from "@/components/assistant-ui/tool-ui";
import { useParams } from "next/navigation";

export const Assistant = () => {
  const { owner, repo, threadId } = useParams();

  const runtime = useChatRuntime({
    api: `/api/chat`,
    body: { owner, repo, threadId },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-dvh">
        <Thread />
        <ToolUIWrapper />
      </div>
    </AssistantRuntimeProvider>
  );
};
