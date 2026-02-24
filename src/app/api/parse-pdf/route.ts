import { NextRequest, NextResponse } from "next/server";
import { extractText } from "unpdf";

export async function POST(req: NextRequest) {
  let formData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are supported" },
        { status: 400 }
      );
    }

    const buffer = new Uint8Array(await file.arrayBuffer());
    const result = await extractText(buffer);
    const text = Array.isArray(result.text) ? result.text.join("\n") : result.text;

    return NextResponse.json({ text });
  } catch (e) {
    console.error("PDF parse error:", e);
    return NextResponse.json(
      { error: "Failed to parse PDF" },
      { status: 500 }
    );
  }
}
