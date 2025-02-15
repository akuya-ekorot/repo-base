import { Assistant } from "@/app/assistant";
import { mastra } from "@/mastra";
import { AiMessageType } from "@mastra/core";

export default async function Page({
  params,
}: {
  params: Promise<{ owner: string; repo: string; threadId: string }>;
}) {
  const { threadId } = await params;
  const initialMessages = ((
    await mastra.memory?.query({ threadId })
  )?.uiMessages.filter((m) => m.role !== "data") ?? []) as Array<
    AiMessageType & { role: Exclude<AiMessageType["role"], "data"> }
  >;

  return <Assistant initialMessages={initialMessages} />;
}
