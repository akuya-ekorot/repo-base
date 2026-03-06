import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { Assistant } from "@/app/assistant";
import { memory } from "@/mastra/memory";
import { ThreadMessageLike } from "@assistant-ui/react";

export default async function Page({
  params,
}: {
  params: Promise<{ owner: string; repo: string; threadId: string }>;
}) {
  const resourceId = (await cookies()).get("resourceId")?.value;
  const { threadId } = await params;

  const [queryResponse, thread] = await Promise.all([
    memory.query({ threadId }),
    memory.getThreadById({ threadId }),
  ]);

  if (!thread || !resourceId) notFound();

  const initialMessages = (queryResponse?.uiMessages ??
    []) as ThreadMessageLike[];

  return (
    <Assistant
      initialMessages={initialMessages}
    />
  );
}
