import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ProjectPost } from '../../../../models/project'
import Link from 'next/link'

async function getProject(slug: string) {
  const userId = process.env.NEXT_USER_ID || '1';
  const res = await fetch(`${process.env.NEXT_API_URL}/public/project/${userId}?field=slug&value=${slug}`,
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

  return res[0] as ProjectPost;
}


export default async function ProjectPost({ params }: { params: { slug: string } }) {
  const projectPost = await getProject(params.slug);

  function getThumbnail(images: any) {
    return images && images[0]
      ? projectPost.images[0].url
      : 'https://generative-placeholders.glitch.me/image?width=1200&height=300&style=joy-division&colors=14';
  };


  return (
    <section className="text-gray-800 dark:text-gray-400 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-64 overflow-hidden">
            <Image alt="content" className="object-cover object-center h-full w-full" src={getThumbnail(projectPost.images)} width={1200} height={300} placeholder="blur" blurDataURL={getThumbnail(projectPost.images)} />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 dark:text-gray-500 text-lg">
                  Stack
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                {projectPost.tags && <p className="text-base">
                  {projectPost.tags.join(', ')}
                </p>}
              </div>
            </div>
            <div className="prose dark:prose-invert dark:prose-headings:text-gray-200 prose-sm sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <h1>
                {projectPost.title}
              </h1>
              <div className="leading-relaxed mb-4 text-left">
                <MDXRemote source={projectPost.content} />
              </div>
              {projectPost.link && <Link href={projectPost.link} className="text-indigo-500 inline-flex items-center">Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
