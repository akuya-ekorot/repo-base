import { mastra } from "@/mastra";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (!mastra.memory) throw new Error("Mastra memory not set up");

  const resourceId = (await cookies()).get("resourceId")?.value;

  if (!resourceId) redirect("/");

  const { messages, owner, repo, threadId } = await req.json();

  const agent = mastra.getAgent("agent");

  try {
    const res = await agent.stream(messages, {
      context: [
        {
          role: "system",
          content: `The repository owner is ${owner} and the repository name is ${repo}`,
        },
      ],
      resourceId,
      threadId,
      toolChoice: "auto",
      maxSteps: 10,
    });
    return res.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
