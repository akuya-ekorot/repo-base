"use client";

import { type FC } from "react";
import { useParams } from "next/navigation";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import {
  AssistantRuntimeProvider,
  ThreadMessageLike,
} from "@assistant-ui/react";

import { Thread } from "@/components/assistant-ui/thread";
import ToolUIWrapper from "@/components/assistant-ui/tool-ui";

interface AssistantProps {
  initialMessages: ThreadMessageLike[];
}

export const Assistant: FC<AssistantProps> = ({ initialMessages }) => {
  const { owner, repo, threadId } = useParams();

  const runtime = useChatRuntime({
    api: `/api/chat`,
    body: { owner, repo, threadId },
    initialMessages,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-dvh w-full">
        <Thread />
        <ToolUIWrapper />
      </div>
    </AssistantRuntimeProvider>
  );
};
