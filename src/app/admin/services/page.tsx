import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ServicesAdmin from "@/components/admin/ServicesAdmin";

export default async function AdminServices() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return <ServicesAdmin services={services} />;
}