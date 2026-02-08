import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const { messages, analysisContext } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    const client = new Anthropic({ apiKey });

    const systemPrompt = `You are Harshal, an elite PM career coach. The user just got their resume analyzed and is now chatting with you for advice. Here's their analysis context:

${analysisContext}

Rules:
- Speak warmly but directly. You're a senior mentor who genuinely wants them to succeed.
- Give SPECIFIC advice referencing their actual resume and the job they're targeting.
- Keep responses concise (2-4 sentences max). This is a chat, not an essay.
- If they ask about rewrites, give them a taste but mention you can do a deeper dive on a call or with Full Access.
- If they ask something you can't help with from the analysis alone, suggest booking a call for personalized strategy.
- Never be salesy. Be helpful first — the value sells itself.
- Don't use markdown formatting, just plain text.`;

    const message = await client.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ message: text });
  } catch (e) {
    console.error("Chat coach error:", e);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
