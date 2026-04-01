import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/portfolio";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<any>;
};

export async function generateStaticParams() {
  const locales = ["en", "ar"];
  return locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      id: project.id,
    })),
  );
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { id, locale } = (await params) as { locale: string; id: string };
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale });
  const copy = t.raw(`projects.items.${id}`) as {
    title: string;
    description: string;
    features: string[];
  };

  return (
    <div className="section-shell py-14">
      <Link href="/#projects">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t("common.viewProjects")}
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-black">{copy.title}</CardTitle>
          <p className="text-muted">{copy.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.filters.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <ul className="list-disc space-y-2 ps-5 text-muted">
            {copy.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <div>
            <p className="mb-2 text-sm font-semibold">Technology Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={project.github} target="_blank" rel="noreferrer">
              <Button variant="secondary">{t("common.github")}</Button>
            </a>
            <a href={project.live} target="_blank" rel="noreferrer">
              <Button>{t("common.liveDemo")}</Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
