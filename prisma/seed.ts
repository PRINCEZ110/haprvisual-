import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  "Rendering",
  "Furniture",
  "Architecture",
  "Visualisation",
  "Space",
  "Products",
];

const SERVICES = [
  {
    title: "3D product rendering",
    description:
      "High-precision and emotionally engaging visualizations that showcase the uniqueness of your product before it's even created. Perfect for e-commerce, advertising, or product launches, our renders make your products stand out.",
  },
  {
    title: "Interior rendering",
    description:
      "Capturing the essence of interior design through detailed, warm renderings that highlight the atmosphere of the space. Whether for residential or commercial projects, we help you convey the ambiance and functionality of every design.",
  },
  {
    title: "Exterior rendering",
    description:
      "Realistic 3D visualizations of exteriors that present architectural harmony with surrounding environments and intricate details. From modern facades to large-scale developments, our renders emphasize both aesthetic appeal and structural integrity.",
  },
  {
    title: "3D modelling",
    description:
      "Transforming ideas into precise and functional 3D models, providing material for any creative or technical projects. We ensure every model is optimized for a seamless integration into your design or production pipeline.",
  },
  {
    title: "Animation",
    description:
      "Adding motion to your projects with professional 3D animations that tell stories and captivate audiences. From product demonstrations to immersive walkthroughs, our animations breathe life into your concepts.",
  },
];

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const PROJECTS = [
  {
    title: "Nordic Lounge",
    year: "2024",
    description:
      "Photorealistic interior visualization of a minimalist lounge for a Scandinavian furniture brand.",
    image: img("1600566753190-17f0baa2a6c3"),
    cats: ["Furniture", "Rendering", "Space"],
  },
  {
    title: "Concrete Villa",
    year: "2023",
    description:
      "Exterior render of a private villa set into a hillside, emphasizing material contrast.",
    image: img("1580587771525-78b9dba3b914"),
    cats: ["Architecture", "Visualisation"],
  },
  {
    title: "Pebble Chair",
    year: "2024",
    description:
      "Studio product render series for a designer chair launch campaign.",
    image: img("1586023492125-27b2c045efd7"),
    cats: ["Products", "Furniture", "Rendering"],
  },
  {
    title: "Amber Apartment",
    year: "2024",
    description:
      "Warm interior visualization of a compact city apartment with layered lighting.",
    image: img("1600210492486-724fe5c67fb0"),
    cats: ["Space", "Rendering"],
  },
  {
    title: "Atelier Office",
    year: "2023",
    description:
      "Workspace visualization blending soft daylight with a muted material palette.",
    image: img("1524758631624-e2822e304c36"),
    cats: ["Space", "Visualisation"],
  },
  {
    title: "Stone House",
    year: "2024",
    description:
      "Evening exterior render highlighting façade rhythm and landscape integration.",
    image: img("1600596542815-ffad4c1539a9"),
    cats: ["Architecture", "Visualisation"],
  },
  {
    title: "Terracotta Kitchen",
    year: "2023",
    description:
      "Interior render of a kitchen with tactile surfaces and natural light studies.",
    image: img("1600585154340-be6161a56a0c"),
    cats: ["Visualisation", "Space"],
  },
  {
    title: "Oak Study",
    year: "2024",
    description:
      "Furniture-focused visualization of a study room with custom oak joinery.",
    image: img("1615873968403-89e068629265"),
    cats: ["Furniture", "Space"],
  },
  {
    title: "Glass Pavilion",
    year: "2024",
    description:
      "Transparent pavilion exterior render with reflective pool and dusk lighting.",
    image: img("1487958449943-2429e8be8625"),
    cats: ["Architecture", "Visualisation"],
  },
  {
    title: "Clay Bath",
    year: "2023",
    description:
      "Editorial bathroom visualization with sculptural fixtures and warm tones.",
    image: img("1600566753086-00f18fb6b3ea"),
    cats: ["Visualisation", "Space"],
  },
  {
    title: "Corten Facade",
    year: "2024",
    description:
      "Urban commercial facade render emphasizing weathering steel texture.",
    image: img("1618221195710-dd6b41faaea6"),
    cats: ["Architecture"],
  },
  {
    title: "Sage Bedroom",
    year: "2024",
    description:
      "Soft, calming bedroom interior render with fabric and greenery details.",
    image: img("1600607687939-ce8a6c25118c"),
    cats: ["Space", "Rendering"],
  },
];

async function main() {
  await Promise.all(
    CATEGORIES.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  const count = await prisma.project.count();
  if (count === 0) {
    await Promise.all(
      PROJECTS.map((p) =>
        prisma.project.create({
          data: {
            title: p.title,
            year: p.year,
            description: p.description,
            coverImage: p.image,
            categories: {
              connect: p.cats.map((name) => ({ name })),
            },
            images: {
              create: [{ url: p.image }],
            },
          },
        })
      )
    );
    console.log(`Seeded ${PROJECTS.length} projects.`);
  } else {
    console.log(`Projects already exist (${count}) — skipping project seed.`);
  }

  await Promise.all(
    SERVICES.map((s, i) =>
      prisma.service.upsert({
        where: { order: i },
        update: { title: s.title, description: s.description },
        create: { title: s.title, description: s.description, order: i },
      })
    )
  );
  console.log(`Seeded ${SERVICES.length} services.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());