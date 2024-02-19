"use client";
//import ImageUploadForm from "@/components/Images/ImageUploadForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import ImageUploadForm from "@/components/Images/ImageUploadForm";
import { RedirectType, redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import SkillsListing from "@/components/public/SkillsListing";
import { SkillItem } from "@/types/skill";
import { createSkill, updateSkill } from "@/clients/skills";
import { SkillInput, skillSchema } from "./validations";
//import { redirect } from "next/navigation";

export function AddEditSkill({ skill }: { skill: SkillItem | null }) {
  const router = useRouter();
  const isAddMode = !skill;
  const defaultValues = isAddMode
    ? {
        title: "",
        image_id: 0,
      }
    : {
        title: skill.title,
        cover_image_id: skill.image?.id ?? 0,
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_1881_16183" fill="white">
                      <path d="M15.328 23.5293C17.8047 22.8144 19.9853 21.321 21.547 19.2701C23.1087 17.2193 23.9686 14.72 23.9992 12.1424C24.0297 9.56481 23.2295 7.04587 21.7169 4.95853C20.2043 2.8712 18.0597 1.32643 15.6007 0.552947C13.1417 -0.220538 10.499 -0.181621 8.0638 0.663935C5.62864 1.50949 3.53049 3.11674 2.07999 5.24771C0.629495 7.37868 -0.096238 9.92009 0.0102418 12.4957C0.116722 15.0713 1.04975 17.5441 2.6712 19.5481L4.96712 17.6904C3.74474 16.1796 3.04133 14.3154 2.96106 12.3737C2.88079 10.432 3.42791 8.51604 4.52142 6.90953C5.61493 5.30301 7.19671 4.09133 9.03255 3.45387C10.8684 2.81642 12.8607 2.78708 14.7145 3.3702C16.5683 3.95332 18.1851 5.1179 19.3254 6.69152C20.4658 8.26514 21.0691 10.1641 21.046 12.1074C21.023 14.0506 20.3748 15.9347 19.1974 17.4809C18.02 19.027 16.3761 20.1528 14.5089 20.6918L15.328 23.5293Z"></path>
                    </mask>
                    <path
                      d="M15.328 23.5293C17.8047 22.8144 19.9853 21.321 21.547 19.2701C23.1087 17.2193 23.9686 14.72 23.9992 12.1424C24.0297 9.56481 23.2295 7.04587 21.7169 4.95853C20.2043 2.8712 18.0597 1.32643 15.6007 0.552947C13.1417 -0.220538 10.499 -0.181621 8.0638 0.663935C5.62864 1.50949 3.53049 3.11674 2.07999 5.24771C0.629495 7.37868 -0.096238 9.92009 0.0102418 12.4957C0.116722 15.0713 1.04975 17.5441 2.6712 19.5481L4.96712 17.6904C3.74474 16.1796 3.04133 14.3154 2.96106 12.3737C2.88079 10.432 3.42791 8.51604 4.52142 6.90953C5.61493 5.30301 7.19671 4.09133 9.03255 3.45387C10.8684 2.81642 12.8607 2.78708 14.7145 3.3702C16.5683 3.95332 18.1851 5.1179 19.3254 6.69152C20.4658 8.26514 21.0691 10.1641 21.046 12.1074C21.023 14.0506 20.3748 15.9347 19.1974 17.4809C18.02 19.027 16.3761 20.1528 14.5089 20.6918L15.328 23.5293Z"
                      stroke="white"
                      strokeWidth="14"
                      mask="url(#path-1-inside-1_1881_16183)"
                    ></path>
                  </svg>
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
