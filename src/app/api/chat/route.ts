import { mastra } from "@/mastra";

// export const runtime = "edge";
// export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const agent = mastra.getAgent("agent");

  try {
    const res = await agent.stream(messages);
    return res.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
