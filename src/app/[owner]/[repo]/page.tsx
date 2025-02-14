import { ResourceThreads } from "@/components/custom/ResourceThreads";
import { mastra } from "@/mastra";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const resourceId = (await cookies()).get("resourceId")!.value;

  const { owner, repo } = await params;

  const resourceThreads = await mastra.memory?.getThreadsByResourceId({
    resourceId,
  });

  const threads = resourceThreads?.filter(
    (thread) =>
      thread.metadata?.owner === owner && thread.metadata?.repo === repo,
  );

  console.dir({ resourceThreads, threads }, { depth: Infinity });

  return (
    <ResourceThreads
      threads={threads}
      repo={repo}
      owner={owner}
      resourceId={resourceId}
    />
  );
}
