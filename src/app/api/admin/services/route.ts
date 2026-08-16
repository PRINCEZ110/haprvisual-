import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const servicesSchema = z.object({
  services: z
    .array(
      z.object({
        id: z.string().min(1),
        title: z.string().trim().min(1).max(200),
        description: z.string().trim().min(1).max(2000),
      })
    )
    .min(1)
    .max(10),
});

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const parsed = servicesSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid services data." }, { status: 400 });
  }

  await Promise.all(
    parsed.data.services.map(async (s) => {
      const existing = await prisma.service.findUnique({ where: { id: s.id } });
      if (!existing) return;
      await prisma.service.update({
        where: { id: s.id },
        data: { title: s.title, description: s.description },
      });
    })
  );

  return NextResponse.json({ ok: true });
}