import { Assistant } from "@/app/assistant";

export default async function Page({
  params,
}: {
  params: Promise<{ repo: string; owner: string }>;
}) {
  const { owner, repo } = await params;

  return <Assistant owner={owner} repo={repo} />;
}
