import { prisma } from "@/lib/prisma";
import { DEFAULT_SERVICES } from "@/lib/constants";

export type ProjectItem = {
  id: string;
  title: string;
  year: string;
  description: string;
  coverImage: string;
  createdAt: Date;
  categories: { name: string }[];
  images: { url: string }[];
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  order: number;
};

export async function getProjects(): Promise<ProjectItem[]> {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { categories: { select: { name: true } }, images: { select: { url: true } } },
    });
  } catch {
    return [];
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    if (services.length === 0) {
      return DEFAULT_SERVICES.map((s, i) => ({
        id: `default-${i}`,
        title: s.title,
        description: s.description,
        order: i,
      }));
    }
    return services;
  } catch {
    return DEFAULT_SERVICES.map((s, i) => ({
      id: `default-${i}`,
      title: s.title,
      description: s.description,
      order: i,
    }));
  }
}

export async function upsertCategories(names: string[]) {
  return Promise.all(
    names.map((name) =>
      prisma.category.upsert({ where: { name }, update: {}, create: { name } })
    )
  );
}