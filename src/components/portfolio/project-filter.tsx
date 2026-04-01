"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projectFilters, projects } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

type ProjectLocale = {
  title: string;
  description: string;
  features: string[];
};

type ProjectsCopy = Record<string, ProjectLocale>;

export function ProjectsFilter({
  copy,
  viewDetails,
  github,
  live,
}: {
  copy: ProjectsCopy;
  viewDetails: string;
  github: string;
  live: string;
}) {
  const [activeFilter, setActiveFilter] = useState<
    typeof projectFilters[number]
  >("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }
    return projects.filter((project) => project.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {projectFilters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "secondary"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((project, index) => {
          const data = copy[project.id];
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{data.title}</CardTitle>
                  <p className="text-sm text-muted">{data.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.filters.map((tag) => (
                      <Badge key={`${project.id}-${tag}`} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <ul className="list-disc space-y-2 ps-5 text-sm text-muted">
                    {data.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Button variant="secondary" size="sm">
                        {github}
                      </Button>
                    </a>
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm">
                        {live}
                      </Button>
                    </a>
                    <Link href={`/projects/${project.id}`}>
                      <Button size="sm">{viewDetails}</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
