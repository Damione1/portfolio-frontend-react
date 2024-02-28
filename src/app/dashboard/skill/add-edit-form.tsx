"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ImageUploadForm from "@/components/Images/ImageUploadForm";
import { useRouter } from "next/navigation";
import { SkillItem, SkillLevel } from "@/types/skill";
import { createSkill, updateSkill } from "@/clients/skills";
import { SkillInput, skillSchema } from "./validations";
import { Loader2, Pickaxe } from "lucide-react";

export function AddEditSkill({ skill }: { skill: SkillItem | null }) {
  const router = useRouter();
  const isAddMode = !skill;
  const defaultValues = isAddMode
    ? {
        title: "",
        image_id: 0,
        level: SkillLevel.Beginner,
        order: 0,
      }
    : {
        title: skill.title,
        image_id: skill.image?.id ?? 0,
        level: skill.level,
        order: skill.order,
      };

  const setImageId = (imageId: number) => {
    setValue("image_id", imageId);
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
  } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues,
  });

  async function onSubmit(fields: SkillInput) {
    const skillPayload = {
      title: fields.title,
      image_id: fields.image_id > 0 ? fields.image_id : null,
      level: fields.level,
      order: fields.order,
    } as SkillItem;

    if (isAddMode) {
      const res = await createSkill(skillPayload);
      if (res.error) {
        console.error("Error creating skill", res.error);
        return;
      }
      if (res.skill) {
        router.push(`/dashboard/skill/${res.skill.id}`);
      }
    } else {
      await updateSkill(skill.id, skillPayload);
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
                  Level
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    <Pickaxe />
                  </span>
                  <select
                    disabled={isSubmitting}
                    {...register("level")}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                  >
                    {Object.values(SkillLevel).map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    {errors.level?.message}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Order
                </label>
                <input
                  type="number"
                  defaultValue={defaultValues.order}
                  onChange={(e) => {
                    const numberValue = parseInt(e.target.value);
                    if (!Number.isNaN(numberValue)) {
                      setValue("order", numberValue);
                    }
                  }}
                  disabled={isSubmitting}
                  className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  dark:disabled:bg-black ${
                    errors.title ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.order?.message}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <input type="hidden" {...register("image_id")} />
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
              href="/dashboard/skill"
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Back to skills
            </Link>
          </div>
        </form>
      </div>
      <div className="col-span-5 xl:col-span-2">
        <ImageUploadForm
          defaultImage={skill?.image ?? null}
          setImageId={setImageId}
          title="Skill  Image"
          subtitle="Upload a new image for the skill"
        ></ImageUploadForm>
      </div>
    </div>
  );
}
