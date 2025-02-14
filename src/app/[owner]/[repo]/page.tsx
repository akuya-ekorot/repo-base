import { cookies } from "next/headers";

import { mastra } from "@/mastra";
import { RepoThread } from "@/components/custom/RepoThread";
import { EnsureThread } from "@/components/custom/EnsureThread";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { NewThreadWithRepoButton } from "@/components/custom/NewThreadButton";

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
        <div className="container mx-auto py-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                Your chat history for {owner}/{repo}
              </CardTitle>
              <NewThreadWithRepoButton
                owner={owner}
                repo={repo}
                resourceId={resourceId}
              />
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {threads.map((thread) => (
                  <RepoThread key={thread.id} thread={thread} />
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </EnsureThread>
  );
}
