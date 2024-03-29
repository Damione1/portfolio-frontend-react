import React from "react";
import ProjectCard from "../../../components/public/ProjectCard";
import type { Metadata } from "next";
import { listPublicProjects } from "@/clients/project";

export const metadata: Metadata = {
  title: "Damien Goehrig - Projects",
  description: "Here are some of my projects",
};

const userId =
  process.env.NEXT_USER_ID && !Number.isNaN(Number(process.env.NEXT_USER_ID))
    ? Number(process.env.NEXT_USER_ID)
    : 1;

export default async function ProjectListing() {
  const { projects, error } = await listPublicProjects(userId);

  return (
    <div className="container max-w-screen-lg xl:max-w-screen-xl dark:text-gray-400color: #b5b5b5;">
      <div className="w-full p-2 sm:p-10">
        <div className="header flex items-end justify-between mb-12">
          <div className="title">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-400">
              My projects
            </h1>
            <p className="text-2xl font-light text-gray-400 dark:text-gray-500">
              Here are some of my projects
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {projects.map((projectItem) => (
            <ProjectCard project={projectItem} key={projectItem.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
