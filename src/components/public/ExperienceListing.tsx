import React from "react";
import { ExperienceType } from "../../types/experience";
import { listPublicExperiences } from "@/clients/experience";
import PublicExperienceItem from "./ExperienceItem";

interface Props {
  mainTitle: string;
  subTitle: string;
  userId: number;
  type: ExperienceType;
}

export default async function ExperienceListing({
  userId,
  type,
  mainTitle,
  subTitle,
}: Props) {
  const { experiences, error } = await listPublicExperiences(userId, type);

  return (
    <section className="text-gray-800 body-font my-40">
      <div className="py-24 flex flex-wrap">
        <div className="flex flex-col w-full mb-10">
          {mainTitle && (
            <h2 className="text-xs tracking-widest font-medium title-font mb-1 dark:text-gray-500">
              {mainTitle}
            </h2>
          )}
          {subTitle && (
            <h3 className="sm:text-3xl text-2xl font-medium title-font dark:text-gray-300">
              {subTitle}
            </h3>
          )}
        </div>
        <div className="flex flex-wrap items-stretch">
          {experiences &&
            experiences.map((experienceItem) => (
              <PublicExperienceItem
                key={experienceItem.id}
                experience={experienceItem}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
