import { mastra } from "@/mastra";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const resourceId = (await cookies()).get("resourceId")?.value;

  if (!resourceId) redirect("/");

  const { owner, repo } = await params;

  const resourceThreads = await mastra.memory?.getThreadsByResourceId({
    resourceId,
  });

  const repoThreads = resourceThreads?.filter(
    (t) => t.metadata?.owner === owner && t.metadata?.repo === repo,
  );

  if (!repoThreads || !repoThreads.length) {
    const thread = await mastra.memory?.createThread({
      resourceId,
      metadata: { owner, repo },
    });

    if (thread) {
      redirect(`/${owner}/${repo}/${thread?.id}`);
    }

    throw Error("Couldn't create a thread");
  }

  return (
    <div>
      {repoThreads?.map((thread) => (
        <pre key={thread.id}>
          <code>{JSON.stringify(thread, null, 2)}</code>
        </pre>
      ))}
    </div>
  );
}
