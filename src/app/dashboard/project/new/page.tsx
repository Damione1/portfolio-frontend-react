"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ProjectPost } from "@/types/project";
import { redirect } from 'next/navigation'
import { Image } from "@/types/media";
import { createProject } from "../_operations";

export default function AdminProjectCreate() {
  const onSubmit = async (formData: FormData) => {
    console.log("submitting form data");
    const projectPayload = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      images: [{ _id: formData.get('image.1') as string }] as Image[],
      user: formData.get('user') as string,
      language: formData.get('language') as string,
      slug: formData.get('slug') as string,
      date: new Date(formData.get('date') as string).toISOString(),
      excerpt: formData.get('excerpt') as string,
    } as ProjectPost;


    const { project, error } = await createProject(projectPayload);
    if (error) {
      console.error("project creation failed", error);
    } else {
      redirect(`/dashboard/project/${project?._id}`);
    }
  };


  return (
    <div>
      <Breadcrumb pageName="Create a new project" />

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
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={new Date().toISOString().split('T')[0]}
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
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray" formAction={onSubmit}>
                  Create Project
                </button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  );

};
