import { Assistant } from "@/app/assistant";

export default async function Page({}: {
  params: Promise<{ owner: string; repo: string; threadId: string }>;
}) {
  console.log("thread page");
  return <Assistant />;
}
