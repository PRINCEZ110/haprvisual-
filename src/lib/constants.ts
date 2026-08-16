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
  "Architecture",
  "Interior",
  "Product",
  "3D Modeling",
  "Animation",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export const BUDGET_OPTIONS = [
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Not sure yet",
] as const;

export type BudgetOption = (typeof BUDGET_OPTIONS)[number];

export const DEADLINE_OPTIONS = [
  "ASAP",
  "1–2 weeks",
  "2–4 weeks",
  "1–2 months",
  "Flexible",
] as const;

export type DeadlineOption = (typeof DEADLINE_OPTIONS)[number];

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
  eyebrow: "Contact",
  heading: "Have a space in mind?",
  subheading: "Let's make it visible.",
  intro:
    "Tell us about your project, and we'll get back to you with the next steps.",
  success: "Thank you! Your submission has been received!",
  error: "Oops! Something went wrong while submitting the form.",
  description:
    "Hapr is a 3D visualization studio merging expertise and artistic vision. We create visualizations that tell stories, evoke emotions, and add value.",
  email: "haprvisual@gmail.com",
  location: "Kathmandu, Nepal",
  rights: "HAPR® 2026. All rights reserved",
  cta: "Let's make it real",
  responseTime: "We usually respond within 1–2 business days.",
  preferEmail: "Prefer email?",
  nameLabel: "Your name",
  emailLabel: "Your email",
  serviceLabel: "What are we creating?",
  budgetLabel: "Project budget",
  deadlineLabel: "When do you need it?",
  messageLabel: "Tell us about the project",
  messagePlaceholder:
    "What are you creating? What do you need visualized? Tell us about the space, product, deadline, references, or anything else that might help us understand the project.",
} as const;

export const SERVICE_PREVIEWS: Record<ServiceOption, string> = {
  Architecture: "/videos/contact-architecture.mp4",
  Interior: "/videos/contact-interior.mp4",
  Product: "/videos/contact-product.mp4",
  "3D Modeling": "/videos/contact-modeling.mp4",
  Animation: "/videos/contact-animation.mp4",
};

export const SERVICE_LABELS: Record<string, string> = {
  "3D product rendering": "Product",
  "Interior rendering": "Interior",
  "Exterior rendering": "Architecture",
  "3D modelling": "Modeling",
  Animation: "Animation",
};

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