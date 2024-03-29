import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { GetPublicProjectById } from "@/clients/project";

export default async function ProjectPost({
  params,
}: {
  params: { project_id: number };
}) {
  const userId =
    process.env.NEXT_USER_ID && !Number.isNaN(Number(process.env.NEXT_USER_ID))
      ? Number(process.env.NEXT_USER_ID)
      : 1;

  const { project, error } = await GetPublicProjectById(
    userId,
    params.project_id
  );

  return (
    <section className="text-gray-800 dark:text-gray-400 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          {project.cover_image && (
            <div className="rounded-lg h-64 overflow-hidden">
              <Image
                alt={project.title}
                className="object-cover object-center h-full w-full"
                src={project.cover_image.path}
                width={1200}
                height={300}
                blurDataURL={project.cover_image.path}
              />
            </div>
          )}
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 dark:text-gray-500 text-lg">
                  Stack
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                {project.skills && (
                  <p className="text-base">
                    {project.skills.map((skill) => skill.title).join(", ")}
                  </p>
                )}
              </div>
            </div>
            <div className="prose dark:prose-invert dark:prose-headings:text-gray-200 prose-sm sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <h1>{project.title}</h1>
              <div className="leading-relaxed mb-4 text-left">
                <MDXRemote source={project.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
