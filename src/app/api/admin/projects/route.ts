import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validation";
import { upsertCategories } from "@/lib/data";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categories: { select: { name: true } },
      images: { select: { url: true } },
    },
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
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

  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid project data." },
      { status: 400 }
    );
  }

  const { title, year, description, coverImage, categories, gallery } =
    parsed.data;

  const categoriesWithIds = await upsertCategories(categories);

  const project = await prisma.project.create({
    data: {
      title,
      year,
      description,
      coverImage,
      categories: {
        connect: categoriesWithIds.map((c) => ({ id: c.id })),
      },
      images: {
        create: gallery.map((url) => ({ url })),
      },
    },
    include: { categories: true, images: true },
  });

  return NextResponse.json(project, { status: 201 });
}