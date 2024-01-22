import React from 'react';
import PublicItem from './Item';
import { Post } from '../../../models/experience'

interface Props {
  userId: string;
  mainTitle: string;
  subTitle: string;
  endpoint: string;
}

export default async function PublicListing({ userId, endpoint, mainTitle, subTitle }: Props) {

  async function getData() {
    return fetch(`${process.env.NEXT_API_URL}/public/${endpoint}/${userId}`,
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


  const postsList = await getData();




  return (
    <section className="text-gray-800 body-font my-40">
      <div className="py-24 flex flex-wrap">
        <div className="flex flex-col w-full mb-10">
          {mainTitle && <h2 className="text-xs tracking-widest font-medium title-font mb-1 dark:text-gray-500">{mainTitle}</h2>}
          {subTitle && <h3 className="sm:text-3xl text-2xl font-medium title-font dark:text-gray-300">{subTitle}</h3>}
        </div>
        <div className="flex flex-wrap items-stretch">
          {postsList.map((post: Post) => (
            <PublicItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
