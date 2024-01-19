import React, { useEffect, useState } from 'react';
import PublicItem, {Post} from './Item.client';

interface Props {
  userId: string;
  mainTitle: string;
  subTitle: string;
  endpoint: string;
}

const PublicListing: React.FC<Props> = ({ userId,endpoint, mainTitle, subTitle }) => {
  const [postsList, setPostsList] = useState<Post[]>([]); // Initialize state

  useEffect(() => {
    async function getData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/${endpoint}/${userId}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint} data`);
      }
      const data = await res.json();
      setPostsList(data);
    }

    getData();
  }, [userId, endpoint]);

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

export default PublicListing;
