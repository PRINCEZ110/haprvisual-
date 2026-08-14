import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import { getProjects, getServices } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, services] = await Promise.all([getProjects(), getServices()]);

  return (
    <main>
      <Hero />
      <Projects projects={projects} />
      <Services services={services} />
      <Contact />
    </main>
  );
}