"use client";

import {
  Briefcase,
  Code2,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Wrench,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BackToTop } from "@/components/portfolio/back-to-top";
import { ContactForm } from "@/components/portfolio/contact-form";
import { Counters } from "@/components/portfolio/counters";
import { Navbar } from "@/components/portfolio/navbar";
import { LocaleSync } from "@/components/portfolio/locale-sync";
import { ProjectsFilter } from "@/components/portfolio/project-filter";
import { ScrollProgress } from "@/components/portfolio/scroll-progress";
import { TestimonialsSlider } from "@/components/portfolio/testimonials-slider";
import { TypingRoles } from "@/components/portfolio/typing-roles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { socialLinks } from "@/data/portfolio";

const skillSet = {
  frontend: [
    { name: "HTML5", progress: 95 },
    { name: "CSS3", progress: 93 },
    { name: "JavaScript", progress: 92 },
    { name: "TypeScript", progress: 88 },
    { name: "React.js", progress: 92 },
    { name: "Next.js", progress: 90 },
    { name: "Vue.js", progress: 72 },
    { name: "Tailwind CSS", progress: 90 },
    { name: "Material UI", progress: 86 },
    { name: "Shadcn/ui", progress: 84 },
    { name: "AJAX", progress: 82 },
    { name: "JSX", progress: 89 },
  ],
  backend: [
    { name: "Node.js", progress: 84 },
    { name: "Express", progress: 82 },
    { name: "MongoDB", progress: 83 },
    { name: "Mongoose", progress: 80 },
    { name: "PostgreSQL", progress: 81 },
    { name: "Prisma", progress: 85 },
    { name: "SQL", progress: 86 },
  ],
  tools: [
    { name: "Zod", progress: 86 },
    { name: "Yup", progress: 84 },
    { name: "Formik", progress: 83 },
    { name: "Stripe", progress: 80 },
    { name: "Kinde", progress: 76 },
    { name: "Nodemailer", progress: 85 },
    { name: "Swiper", progress: 82 },
    { name: "Lucide", progress: 85 },
    { name: "Slugify", progress: 84 },
    { name: "Noval", progress: 79 },
    { name: "Sonner", progress: 82 },
  ],
  other: [
    { name: "Object-Oriented Programming", progress: 88 },
    { name: "Debugging & Testing", progress: 93 },
    { name: "Scalable Code Architecture", progress: 90 },
  ],
};

function SkillCategory({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: { name: string; progress: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.name} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>{item.name}</span>
              <span className="text-muted">{item.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-foreground/10">
              <motion.div
                className="h-2 rounded-full bg-linear-to-r from-brand to-hero-accent"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function PortfolioPage() {
  const t = useTranslations();
  const locale = useLocale();

  const roles = t.raw("hero.roles") as string[];
  const strengths = t.raw("about.strengths") as string[];
  const expSEPoints = t.raw(
    "experience.items.softwareEngineer.points",
  ) as string[];
  const expFEPoints = t.raw(
    "experience.items.frontendDeveloper.points",
  ) as string[];
  const education = t.raw("education.items") as Array<{
    degree: string;
    field: string;
    institution: string;
    period: string;
  }>;
  const testimonials = t.raw("testimonials.items") as Array<{
    quote: string;
    author: string;
    role: string;
  }>;
  const projectCopy = t.raw("projects.items") as Record<
    string,
    { title: string; description: string; features: string[] }
  >;

  return (
    <div className="font-directional">
      <LocaleSync />
      <ScrollProgress />
      <Navbar
        labels={{
          home: t("nav.home"),
          about: t("nav.about"),
          skills: t("nav.skills"),
          experience: t("nav.experience"),
          projects: t("nav.projects"),
          education: t("nav.education"),
          contact: t("nav.contact"),
        }}
      />

      <main className="space-y-24 pb-20">
        <section
          id="home"
          className="hero-grid relative overflow-hidden border-b border-border/70 py-20 sm:py-28"
        >
          <div className="section-shell relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Badge>{t("hero.location")}</Badge>
              <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {t("hero.name")}
              </h1>
              <p className="text-xl font-semibold text-muted sm:text-2xl">
                {t("hero.title")}
              </p>
              <TypingRoles roles={roles} />
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                {t("hero.intro")}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#projects">
                  <Button>{t("common.viewProjects")}</Button>
                </a>
                <a href="#contact">
                  <Button variant="secondary">{t("common.contactMe")}</Button>
                </a>
                <a href="/resume-mohamed-dahy.pdf" download>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    {t("common.downloadResume")}
                  </Button>
                </a>
              </div>
            </motion.div>
            <div className="float-y rounded-3xl border border-border bg-card p-6 shadow-xl">
              <Counters
                items={[
                  { to: 4, label: t("hero.stats.years") },
                  { to: 18, label: t("hero.stats.projects") },
                  { to: 60, label: t("hero.stats.components") },
                ]}
              />
            </div>
          </div>
        </section>

        <section id="about" className="section-shell scroll-mt-24 space-y-6">
          <h2 className="text-3xl font-black sm:text-4xl">
            {t("about.heading")}
          </h2>
          <Card>
            <CardContent className="space-y-4 p-6 sm:p-8">
              <p className="text-base leading-8 text-muted">
                {t("about.journey")}
              </p>
              <p className="text-base leading-8 text-muted">
                {t("about.focus")}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>{t("about.period")}</Badge>
              </div>
              <h3 className="pt-2 text-lg font-bold">
                {t("about.strengthsTitle")}
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {strengths.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-border/80 bg-background p-3 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="skills" className="section-shell scroll-mt-24 space-y-8">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">
              {t("skills.heading")}
            </h2>
            <p className="mt-2 max-w-3xl text-muted">
              {t("skills.subheading")}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <SkillCategory
              icon={<Code2 className="h-5 w-5 text-brand" />}
              title={t("skills.categories.frontend")}
              items={skillSet.frontend}
            />
            <SkillCategory
              icon={<Database className="h-5 w-5 text-brand" />}
              title={t("skills.categories.backend")}
              items={skillSet.backend}
            />
            <SkillCategory
              icon={<Wrench className="h-5 w-5 text-brand" />}
              title={t("skills.categories.tools")}
              items={skillSet.tools}
            />
            <SkillCategory
              icon={<Briefcase className="h-5 w-5 text-brand" />}
              title={t("skills.categories.other")}
              items={skillSet.other}
            />
          </div>
        </section>

        <section
          id="experience"
          className="section-shell scroll-mt-24 space-y-8"
        >
          <h2 className="text-3xl font-black sm:text-4xl">
            {t("experience.heading")}
          </h2>
          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("experience.items.softwareEngineer.role")}
                </CardTitle>
                <p className="text-sm text-muted">
                  {t("experience.items.softwareEngineer.company")} |{" "}
                  {t("experience.items.softwareEngineer.period")}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 ps-5 text-sm leading-7 text-muted">
                  {expSEPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("experience.items.frontendDeveloper.role")}
                </CardTitle>
                <p className="text-sm text-muted">
                  {t("experience.items.frontendDeveloper.company")} |{" "}
                  {t("experience.items.frontendDeveloper.period")}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 ps-5 text-sm leading-7 text-muted">
                  {expFEPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="projects" className="section-shell scroll-mt-24 space-y-8">
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">
              {t("projects.heading")}
            </h2>
            <p className="mt-2 max-w-3xl text-muted">
              {t("projects.subheading")}
            </p>
          </div>
          <ProjectsFilter
            copy={projectCopy}
            viewDetails={t("projects.viewDetails")}
            github={t("common.github")}
            live={t("common.liveDemo")}
          />
        </section>

        <section
          id="education"
          className="section-shell scroll-mt-24 space-y-6"
        >
          <h2 className="text-3xl font-black sm:text-4xl">
            {t("education.heading")}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <Card key={item.degree}>
                <CardContent className="space-y-2 p-6">
                  <div className="flex items-center gap-2 text-brand">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-lg font-bold">{item.degree}</p>
                  <p className="text-sm text-muted">{item.field}</p>
                  <p className="text-sm text-muted">{item.institution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-shell space-y-6">
          <h2 className="text-3xl font-black sm:text-4xl">
            {t("testimonials.heading")}
          </h2>
          <TestimonialsSlider items={testimonials} />
        </section>

        <section id="contact" className="section-shell scroll-mt-24">
          <Card>
            <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4">
                <h2 className="text-3xl font-black sm:text-4xl">
                  {t("contact.heading")}
                </h2>
                <p className="text-muted">{t("contact.description")}</p>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-brand" />
                    {t("contact.email")}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-brand" />
                    {t("contact.phone")}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand" />
                    {t("contact.location")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a href={socialLinks.github} target="_blank" rel="noreferrer">
                    <Button
                      variant="secondary"
                      className="gap-2"
                      aria-label="GitHub"
                    >
                      <ExternalLink className="h-4 w-4" />
                      GitHub
                    </Button>
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      variant="secondary"
                      className="gap-2"
                      aria-label="LinkedIn"
                    >
                      <ExternalLink className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </div>

              <ContactForm
                copy={{
                  name: t("common.name"),
                  email: t("common.email"),
                  subject: t("common.subject"),
                  message: t("common.message"),
                  send: t("common.send"),
                  sending: t("common.sending"),
                  success: t("contact.success"),
                  error: t("contact.error"),
                }}
              />
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/70 py-8">
        <div className="section-shell flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
          <p>
            {t("hero.name")} © {new Date().getFullYear()} - {t("footer.rights")}
          </p>
          <p>
            {locale === "ar"
              ? "مصمم بعناية باستخدام Next.js"
              : "Crafted carefully with Next.js"}
          </p>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
