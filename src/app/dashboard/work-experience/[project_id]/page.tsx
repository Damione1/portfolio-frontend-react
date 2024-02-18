"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getWorkExperienceById, updateWorkExperience } from "../client";
import { ChangeEvent, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { WorkExperiencePost } from "@/types/experience";
import SwitcherOne from "@/components/Switchers/SwitcherOne";

export default function AdminProjectEdit({
  params,
}: {
  params: { project_id: string };
}) {
  const [project, setWorkExperience] = useState<WorkExperiencePost | null>(
    null
  );
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    (async () => {
      if (params === undefined || params.project_id === undefined) {
        notFound();
      }
      const { WorkExperience, error } = await getWorkExperienceById(
        params.project_id
      );
      if (error || !WorkExperience) {
        window.alert(`WorkExperience not found: ${error}`);
        notFound();
      } else {
        setWorkExperience(WorkExperience);
        setIsCurrent(WorkExperience.current);
      }
    })();
  }, [params, params.project_id]);

  async function onSubmit(formData: FormData) {
    const startDate = new Date(
      formData.get("startDate") as string
    ).toISOString();
    const endDate = isCurrent
      ? null
      : new Date(formData.get("endDate") as string).toISOString();

    const WorkExperiencePayload = {
      title: formData.get("title") as string,
      subTitle: formData.get("subtitle") as string,
      startDate: startDate,
      endDate: endDate,
      current: (formData.get("current") ?? false) as boolean,
      description: formData.get("description") as string,
      _id: params.project_id as string,
    } as WorkExperiencePost;

    const { WorkExperience, error } = await updateWorkExperience(
      WorkExperiencePayload
    );
    if (error) {
      window.alert(`Project update failed: ${error}`);
      return;
    }
    return WorkExperience as WorkExperiencePost;
  }

  return (
    <div>
      <Breadcrumb pageName="Edit WorkExperience" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <form action={onSubmit}>
            {/* <!-- Input Fields --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Job Title
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
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    defaultValue={project?.subTitle}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={12}
                    name="description"
                    defaultValue={project?.description}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      defaultValue={
                        project?.startDate
                          ? new Date(project?.startDate)
                              .toISOString()
                              .split("T")[0]
                          : undefined
                      }
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Current
                    </label>
                    <SwitcherOne
                      name="current"
                      checked={isCurrent}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setIsCurrent(e.target.checked)
                      }
                    />
                  </div>

                  <div className="w-full xl:w-5/12">
                    {!isCurrent && (
                      <div>
                        <label className="mb-3 block text-black dark:text-white">
                          End Date
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          defaultValue={
                            project?.endDate
                              ? new Date(project?.endDate)
                                  .toISOString()
                                  .split("T")[0]
                              : undefined
                          }
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Edit WorkExperience
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
