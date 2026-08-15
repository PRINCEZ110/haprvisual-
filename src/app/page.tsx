import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Studio from "@/components/Studio";
import Services from "@/components/Services";
import ShowReels from "@/components/ShowReels";
import Contact from "@/components/Contact";
import { getProjects, getServices } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, services] = await Promise.all([getProjects(), getServices()]);

  return (
    <>
      <Hero />
      <Projects projects={projects} />
      <Studio />
      <Services services={services} />
      <ShowReels />
      <Contact />
    </>
  );
}