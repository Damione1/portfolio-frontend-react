import React, { useEffect, useState } from 'react';
import Image from 'next/image'

interface Props {
  userId: string;
  mainTitle: string;
  subTitle: string;
}

interface SkillItem {
  id: string;
  name: string;
  icon: {
    url: string;
  };
}

const SkillsListing: React.FC<Props> = ({ userId, mainTitle, subTitle }) => {
  const [skillsList, setSkillsList] = useState<SkillItem[]>([]);

  useEffect(() => {
    const getSkills = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/skill/${userId}`);
      const data = await res.json();
      setSkillsList(data);
    }

    getSkills();
  }, [userId]);

  return (
    <section className="text-gray-800 body-font my-40">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col w-full mb-10">
          {mainTitle && <h2 className="text-xs tracking-widest font-medium title-font mb-1 dark:text-gray-500">{mainTitle}</h2>}
          {subTitle && <h3 className="sm:text-3xl text-2xl font-medium title-font dark:text-gray-300">{subTitle}</h3>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2 lg:gap-6">
          {skillsList.map(skill => (
            <div key={skill.id} className="flex flex-col items-center p-3 bg-gray-200 dark:bg-neutral-800 rounded">
              {skill.icon && <Image className="w-16 h-16" src={skill.icon.url} alt={skill.name} />}
              <p className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-200">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsListing;
