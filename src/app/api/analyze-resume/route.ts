import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 3) return false;

  entry.count++;
  return true;
}

const SYSTEM_PROMPT = `You are Harshal, a PM career coach. Warm but direct. Be specific — reference actual resume lines and JD requirements.

Return ONLY valid JSON (no markdown, no extra text):

{"matchScore":<0-100>,"coachSummary":"<2-3 sentences. Honest take on fit for THIS role.>","strengths":["<3 items. Each quotes a specific resume line and says which JD requirement it satisfies.>"],"gaps":["<2-4 items. What the JD wants that the resume doesn't show.>"],"rewrites":[{"original":"<exact bullet from resume, verbatim>","rewritten":"<better version tailored to JD, max 20 words>","why":"<1 sentence>"}]}

RULES:
- Only include bullets that ACTUALLY EXIST in the resume. Never invent content.
- rewrites: pick the 5-8 weakest bullets from the resume. Quote them exactly in "original".
- strengths: quote actual resume lines.
- gaps: reference specific JD requirements.
- matchScore: skills match % (40%) + experience relevance (30%) + keyword overlap (30%). Be consistent.`;

export async function POST(req: NextRequest) {
  const ip = getRateLimitKey(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. You can analyze 3 resumes per day. Try again tomorrow." },
      { status: 429 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const { resume, jobDescription } = await req.json();

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: "Both resume and job description are required" },
        { status: 400 }
      );
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 4096,
      temperature: 0,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `RESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jobDescription}`,
        },
      ],
    });

    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";
    // Extract JSON from response - Claude sometimes wraps it in text or markdown
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }
    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json(result);
  } catch (e) {
    console.error("Analyze resume error:", e);
    return NextResponse.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    );
  }
}
