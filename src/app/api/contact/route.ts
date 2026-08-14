import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/mail";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip, 3, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill in all required fields correctly." },
      { status: 400 }
    );
  }

  try {
    const submission = await prisma.contactSubmission.create({
      data: parsed.data,
    });
    await sendContactEmail(parsed.data).catch((err) =>
      console.error("[mail] failed to send:", err)
    );
    return NextResponse.json(
      { ok: true, id: submission.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[contact] failed to store submission:", err);
    return NextResponse.json(
      { error: "Oops! Something went wrong while submitting the form." },
      { status: 500 }
    );
  }
}