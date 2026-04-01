export type ProjectItem = {
  id: string;
  filters: string[];
  technologies: string[];
  github: string;
  live: string;
};

export const projectFilters = [
  "All",
  "Next.js",
  "React",
  "TypeScript",
  "MongoDB",
  "PostgreSQL",
] as const;

export const projects: ProjectItem[] = [
  {
    id: "blog-creator",
    filters: ["Next.js", "React", "TypeScript", "PostgreSQL"],
    technologies: [
      "Next.js 15",
      "Shadcn/ui",
      "Tailwind CSS",
      "TypeScript",
      "React",
      "Noval",
      "Kinde",
      "Sonner",
      "Zod",
      "Lucide",
      "Slugify",
      "PostgreSQL",
      "Prisma",
      "JWT",
      "Stripe",
    ],
    github: "https://github.com/placeholder/blog-creator",
    live: "https://demo-blog-creator.vercel.app",
  },
  {
    id: "shark-home-solutions",
    filters: ["Next.js", "React", "MongoDB"],
    technologies: [
      "Next.js 14",
      "Material UI",
      "Swiper",
      "Formik",
      "Yup",
      "CSS",
      "MongoDB",
      "Mongoose",
      "Nodemailer",
    ],
    github: "https://github.com/placeholder/shark-home-solutions",
    live: "https://www.sharkhomesolutions.com",
  },
];

export const socialLinks = {
  github: "https://github.com/placeholder",
  linkedin: "https://www.linkedin.com/in/placeholder",
};

export const sectionIds = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "contact",
] as const;
