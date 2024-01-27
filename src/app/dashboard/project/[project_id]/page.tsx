"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getProjectById, updateProject } from "./../_operations";
import { ProjectPost } from "@/types/project";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";
import { notFound } from 'next/navigation'
import { Image } from "@/types/media";

export default function AdminProjectEdit({ params }: { params: { project_id: string } }) {
  const [project, setProject] = useState<ProjectPost | null>(null);

  useEffect(() => {
    (async () => {
      if (params === undefined || params.project_id === undefined) {
        notFound();
      }
      const { project, error } = await getProjectById(params.project_id);
      if (error || !project) {
        window.alert(`Project not found: ${error}`);
        notFound();
      } else {
        setProject(project);
      }
    })();
  }, [params, params.project_id]);


  async function onSubmit(formData: FormData) {
    const projectPayload = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      images: [] as Image[],
      slug: formData.get('slug') as string,
      excerpt: formData.get('excerpt') as string,
      _id: params.project_id as string
    } as ProjectPost;

    const image = formData.get('image.1') as string;
    if (image) {
      projectPayload.images = [{ _id: image }] as Image[];
    }

    const { project, error } = await updateProject(projectPayload);
    if (error) {
      window.alert(`Project update failed: ${error}`);
      return;
    }
    return project as ProjectPost;
  };


  return (

    <div>
      <Breadcrumb pageName="Edit Project" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <form action={onSubmit}>
            {/* <!-- Input Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col gap-5.5 p-6.5">

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={project?.title}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Excerpt
                  </label>
                  <input
                    type="text"
                    name="excerpt"
                    defaultValue={project?.excerpt}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Content
                  </label>
                  <textarea
                    rows={6}
                    name="content"
                    defaultValue={project?.content}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={project?.slug}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Created at
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled
                      value={project?.createdAt}
                      className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Updated at
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled
                      value={project?.updatedAt}
                      className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Image ID
                  </label>
                  <input
                    type="text"
                    name="image.1"
                    value={project?.images[0]?._id}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Update Project
                </button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  );

};
