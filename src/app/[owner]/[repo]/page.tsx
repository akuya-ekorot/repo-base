import { EnsureThread } from "@/components/custom/EnsureThread";
import { RepoThread } from "@/components/custom/RepoThread";
import { mastra } from "@/mastra";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  // Fetch threads by resourceId
  const resourceId = (await cookies()).get("resourceId")!.value;
  const resourceThreads = await mastra.memory?.getThreadsByResourceId({
    resourceId,
  });

  // filter to repository threads
  const { owner, repo } = await params;
  const threads = resourceThreads?.filter(
    (thread) =>
      thread.metadata?.owner === owner && thread.metadata?.repo === repo,
  );

  return (
    <EnsureThread
      resourceId={resourceId}
      owner={owner}
      repo={repo}
      threads={threads}
    >
      {!!threads?.length && (
        <ul className="space-y-4">
          {threads.map((thread) => (
            <RepoThread key={thread.id} thread={thread} />
          ))}
        </ul>
      )}
    </EnsureThread>
  );
}
