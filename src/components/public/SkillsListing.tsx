import React from 'react';
import Image from 'next/image'
import { Skill } from '../../../types/skill'

interface Props {
  userId: string;
  mainTitle: string;
  subTitle: string;
}


export default async function SkillsListing({ userId, mainTitle, subTitle }: Props) {

  async function getSkills() {
    return fetch(`${process.env.NEXT_API_URL}/public/skill/${userId}`,
      {
        next: {
          revalidate: 30,
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
  }

  const skillsList = await getSkills();


  return (
    <section className="text-gray-800 body-font my-40">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col w-full mb-10">
          {mainTitle && <h2 className="text-xs tracking-widest font-medium title-font mb-1 dark:text-gray-500">{mainTitle}</h2>}
          {subTitle && <h3 className="sm:text-3xl text-2xl font-medium title-font dark:text-gray-300">{subTitle}</h3>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2 lg:gap-6">
          {skillsList.map((skill: Skill) => (
            <div key={skill.id} className="flex flex-col items-center p-3 bg-white dark:bg-boxdark rounded">
              {skill.icon && <Image className="w-16 h-16" src={skill.icon.url} alt={skill.name} width={64} height={64} />}
              <p className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-200">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}
