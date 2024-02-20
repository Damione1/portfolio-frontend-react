"use client";
import { ProjectItem, ProjectStatus } from "@/types/project";
//import ImageUploadForm from "@/components/Images/ImageUploadForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectInput, projectSchema } from "./validations";
import Link from "next/link";
import { createProject, updateProject } from "../../../clients/project";
import ImageUploadForm from "@/components/Images/ImageUploadForm";
import { RedirectType, redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SkillItem } from "@/types/skill";
import SkillsListing from "@/components/public/SkillsListing";
import { File, Loader2, Pen, Pickaxe } from "lucide-react";
//import { redirect } from "next/navigation";

export function AddEdit({
  project,
  skills,
}: {
  project: ProjectItem | null;
  skills: SkillItem[];
}) {
  const router = useRouter();
  const isAddMode = !project;
  const defaultValues = isAddMode
    ? {
        title: "",
        excerpt: "",
        content: "",
        cover_image_id: 0,
        status: ProjectStatus.Draft,
        skill_ids: [] as number[],
      }
    : {
        title: project.title,
        excerpt: project.excerpt,
        content: project.content,
        cover_image_id: project.cover_image?.id ?? 0,
        status: project.status,
        skill_ids: project.skills.map((skill) => skill.id) ?? ([] as number[]),
      };

  const setImageId = (imageId: number) => {
    setValue("cover_image_id", imageId);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  async function onSubmit(fields: ProjectInput) {
    const projectPayload = {
      title: fields.title,
      excerpt: fields.excerpt,
      content: fields.content,
      cover_image_id: fields.cover_image_id > 0 ? fields.cover_image_id : null,
      status: fields.status,
      skill_ids: fields.skill_ids ?? ([] as number[]),
    } as ProjectItem;

    if (isAddMode) {
      const res = await createProject(projectPayload);
      if (res.error) {
        console.error("Error creating project", res.error);
        return;
      }
      if (res.project) {
        router.push(`/dashboard/project/${res.project.id}`);
      }
    } else {
      await updateProject(project.id, projectPayload);
    }
  }

  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 xl:col-span-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  {...register("title")}
                  disabled={isSubmitting}
                  className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  dark:disabled:bg-black ${
                    errors.title ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.title?.message}</div>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Excerpt
                </label>
                <input
                  type="text"
                  {...register("excerpt")}
                  disabled={isSubmitting}
                  className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black ${
                    errors.title ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.excerpt?.message}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Content
                </label>
                <textarea
                  rows={12}
                  disabled={isSubmitting}
                  {...register("content")}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                ></textarea>
                <div className="invalid-feedback">
                  {errors.content?.message}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Status
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    <File />
                  </span>
                  <select
                    disabled={isSubmitting}
                    {...register("status")}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                  >
                    {Object.values(ProjectStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <Pen />
                  </span>
                  <div className="invalid-feedback">
                    {errors.status?.message}
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Skills
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    <Pickaxe />
                  </span>
                  <select
                    disabled={isSubmitting}
                    multiple
                    defaultValue={defaultValues.skill_ids.map((id) =>
                      id.toString()
                    )}
                    onChange={(e) => {
                      const selectedSkillIds = Array.from(
                        e.target.selectedOptions,
                        (option) => Number(option.value)
                      );
                      setValue("skill_ids", selectedSkillIds);
                    }}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                  >
                    {Object.values(skills).map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.title}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    {errors.skill_ids?.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <input type="hidden" {...register("cover_image_id")} />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              {isSubmitting && (
                <span className="animate-spin mr-4">
                  <Loader2 />
                </span>
              )}
              Save
            </button>
            <button
              onClick={() => reset(defaultValues)}
              type="button"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Reset
            </button>
            <Link
              href="/dashboard/project"
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Back to projects
            </Link>
          </div>
        </form>
      </div>
      <div className="col-span-5 xl:col-span-2">
        <ImageUploadForm
          defaultImage={project?.cover_image ?? null}
          setImageId={setImageId}
          title="Project Cover Image"
          subtitle="Upload a cover image for your project"
        ></ImageUploadForm>
      </div>
    </div>
  );
}
