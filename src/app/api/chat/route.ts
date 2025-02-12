import { mastra } from "@/mastra";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  if (!owner || !repo) throw new Error("Repository information not available");

  const { messages } = await req.json();

  const agent = mastra.getAgent("agent");

  try {
    const res = await agent.stream(messages, {
      context: [
        {
          role: "system",
          content: `The repository owner is ${owner} and the repository name is ${repo}`,
        },
      ],
      resourceId: "36d45027-f9bd-4a4c-9986-764a3c62dbd3",
      threadId: "256c7e48-849b-4e64-811b-801f47f3c356",
      toolChoice: "auto",
      maxSteps: 10,
    });
    return res.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
