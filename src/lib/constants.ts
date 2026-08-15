export const CATEGORIES = [
  "Rendering",
  "Furniture",
  "Architecture",
  "Visualisation",
  "Space",
  "Products",
] as const;

export type CategoryName = (typeof CATEGORIES)[number];

export const SERVICE_OPTIONS = [
  "Product",
  "Interior",
  "Exterior",
  "Modeling",
  "Animation",
] as const;

export const BUDGET_OPTIONS = ["Less than 2K", "2K - 10K", "10K - 50K"] as const;

export const DEFAULT_SERVICES = [
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
] as const;

export const CONTACT_COPY = {
  heading: "Let's collaborate!",
  success: "Thank you! Your submission has been received!",
  error: "Oops! Something went wrong while submitting the form.",
  description:
    "Hapr is a 3D visualization studio merging expertise and artistic vision. We create visualizations that tell stories, evoke emotions, and add value.",
  email: "haprvisual@gmail.com",
  location: "Kyiv, Ukraine",
  rights: "HAPR® 2024. All rights reserved",
} as const;

export const SERVICE_VIDEOS: Record<string, string> = {
  "3D product rendering": "/videos/product-render.mp4",
  "Interior rendering": "/videos/service-interior-render.mp4",
  "Exterior rendering": "/videos/service-exterior-render.mp4",
  "3D modelling": "/videos/service-modeling-render.mp4",
  Animation: "/videos/service-animation-render.mp4",
};

export const SERVICE_PANEL_VIDEOS: Record<string, string[]> = {
  "3D product rendering": [
    "/videos/service-product-panel-1.mp4",
    "/videos/service-product-panel-2.mp4",
  ],
  "Interior rendering": [
    "/videos/service-interior-panel-1.mp4",
    "/videos/service-interior-panel-2.mp4",
  ],
  "Exterior rendering": [
    "/videos/service-exterior-panel-1.mp4",
    "/videos/service-exterior-panel-2.mp4",
  ],
  "3D modelling": [
    "/videos/service-modeling-panel-1.mp4",
    "/videos/service-modeling-panel-2.mp4",
  ],
  Animation: [
    "/videos/service-animation-panel-1.mp4",
    "/videos/service-animation-panel-2.mp4",
  ],
};

export const SERVICE_THUMBNAILS = [
  {
    image1: "/images/service-product-1.jpg",
    image2: "/images/service-product-2.jpg",
  },
  {
    image1:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    image2:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
  {
    image1:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80",
    image2:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80",
  },
  {
    image1:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80",
    image2:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80",
  },
  {
    image1:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
    image2:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
] as const;