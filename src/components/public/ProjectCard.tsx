import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../../helpers/date";
import { ProjectItem } from "../../types/project";

interface ProjectCardProps {
  project: ProjectItem;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getPostThumbnail = (projectItem: ProjectItem) => {
    let thumbnail =
      "https://generative-placeholders.glitch.me/image?width=320&height=160&style=joy-division&colors=14";
    if (projectItem.cover_image) {
      thumbnail = projectItem.cover_image.path;
    }
    return thumbnail;
  };

  return (
    <div
      key={project.id}
      className="overflow-hidden shadow-lg rounded-lg h-90 w-100 sm:w-80 md:w-100 cursor-pointer m-auto bg-white dark:bg-boxdark"
    >
      <Link href={`/project/${project.id}`} className="w-full block h-full">
        <Image
          alt={project.title}
          src={getPostThumbnail(project)}
          className="max-h-50 w-full object-cover"
          width={320}
          height={160}
        />
        <div className="dark:bg-neutral-800 w-full p-4">
          <p className="text-indigo-500 text-md font-medium">{project.title}</p>
          {project.excerpt && (
            <p className="text-gray-400 dark:text-gray-300 font-light text-md">
              {project.excerpt}
            </p>
          )}
          <div className="flex items-center mt-4">
            <div className="flex flex-col justify-between text-sm">
              <p className="text-gray-400 dark:text-gray-300">
                {formatDate(project.created_at.toString())}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
