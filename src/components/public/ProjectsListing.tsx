import React from "react";
import Link from "next/link";
import ProjectCard from "../../components/public/ProjectCard";
import { listPublicProjects } from "@/clients/project";

interface Props {
  userId: number;
  mainTitle: string;
  subTitle: string;
}

export default async function ProjectsListing({
  userId,
  mainTitle,
  subTitle,
}: Props) {
  const { projects, error } = await listPublicProjects(userId);

  return (
    <section className="text-gray-800 my-40 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-col w-full mb-10">
          <h2 className="text-xs tracking-widest font-medium title-font mb-1 dark:text-gray-500">
            {mainTitle}
          </h2>
          <h3 className="sm:text-3xl text-2xl font-medium title-font dark:text-gray-300">
            {subTitle}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {projects &&
            projects
              .slice(0, 3)
              .map((projectItem) => (
                <ProjectCard project={projectItem} key={projectItem.id} />
              ))}
        </div>
        <div className="text-right w-full mt-8">
          <Link
            href="/project"
            className="text-indigo-500 inline-flex items-center"
          >
            <span className="mr-3">View All Projects</span>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-3"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
