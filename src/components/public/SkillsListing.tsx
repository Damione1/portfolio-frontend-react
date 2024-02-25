import React from "react";
import Image from "next/image";
import { SkillItem } from "@/types/skill";
import { listPublicSkills } from "@/clients/skills";

interface Props {
  userId: number;
  mainTitle: string;
  subTitle: string;
}

export default async function SkillsListing({
  userId,
  mainTitle,
  subTitle,
}: Props) {
  const { skills, error } = await listPublicSkills(userId);

  return (
    <section className="text-gray-800 body-font my-40">
      <div className="container px-5 py-24 mx-auto">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2 lg:gap-6">
          {skills.map((skillItem: SkillItem) => (
            <div
              key={skillItem.id}
              className="flex flex-col items-center p-3 bg-white dark:bg-boxdark rounded"
            >
              {skillItem.image && (
                <Image
                  className="w-16 h-16"
                  src={skillItem.image.path}
                  alt={skillItem.title}
                  width={64}
                  height={64}
                />
              )}
              <p className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-200">
                {skillItem.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
