"use client";
import { WorkExperienceType } from "@/types/experience";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { SkillItem } from "@/types/skill";
import { Check, File, Image, Loader2, Pen, Pickaxe, X } from "lucide-react";
import { WorkExperienceItem } from "@/types/experience";
import { ExperienceInput, experienceSchema } from "./validations";
import {
  createWorkExperience,
  updateWorkExperience,
} from "@/clients/work-experience";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function AddEdit({
  experience,
  skills,
}: {
  experience: WorkExperienceItem | null;
  skills: SkillItem[];
}) {
  const router = useRouter();
  const isAddMode = !experience;
  const defaultValues = isAddMode
    ? {
        title: "",
        subtitle: "",
        description: "",
        start_date: new Date(),
        end_date: undefined,
        is_current: true,
        type: WorkExperienceType.Work,
        skill_ids: [] as number[],
      }
    : {
        title: experience.title,
        subtitle: experience.subtitle,
        description: experience.description,
        start_date: new Date(experience.start_date),
        end_date: experience.end_date
          ? new Date(experience.end_date)
          : undefined,
        is_current: experience.end_date ? false : true,
        type: experience.type,
        skill_ids: experience.skills
          ? experience.skills.map((skill) => skill.id)
          : ([] as number[]),
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
  } = useForm<ExperienceInput>({
    resolver: zodResolver(experienceSchema),
    defaultValues,
  });

  const [isCurrent, setIsCurrent] = useState<boolean>(defaultValues.is_current);

  async function onSubmit(fields: ExperienceInput) {
    const experiencePayload = {
      title: fields.title,
      subtitle: fields.subtitle,
      description: fields.description,
      start_date: fields.start_date,
      end_date: fields.end_date ? fields.end_date : null,
      type: fields.type,
      skill_ids: fields.skill_ids,
    } as WorkExperienceItem;

    console.log(experiencePayload);

    if (isAddMode) {
      const res = await createWorkExperience(experiencePayload);
      if (res.error) {
        console.error("Error creating experience", res.error);
        return;
      }
      if (res.workExperience) {
        router.push(`/dashboard/work-experience/${res.workExperience.id}`);
      }
    } else {
      await updateWorkExperience(experience.id, experiencePayload);
    }
  }

  console.log(watch("start_date"));
  console.log(watch("end_date"));

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
                  Subtitle
                </label>
                <input
                  type="text"
                  {...register("subtitle")}
                  disabled={isSubmitting}
                  className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  dark:disabled:bg-black ${
                    errors.title ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.subtitle?.message}
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Start Date
                  </label>
                  <Controller
                    control={control}
                    name="start_date"
                    render={({ field }) => (
                      <ReactDatePicker
                        placeholderText="Select date"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                      />
                    )}
                  />
                  <div className="invalid-feedback">
                    {errors.start_date?.message}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Current
                  </label>
                  <div>
                    <label
                      htmlFor="toggle3"
                      className="flex cursor-pointer select-none items-center"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="toggle3"
                          className="sr-only"
                          {...register("is_current")}
                          onChange={(e) => {
                            setIsCurrent(!isCurrent);
                            if (isCurrent) {
                              setValue("end_date", undefined);
                            }
                          }}
                        />
                        <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                        <div
                          className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                            isCurrent &&
                            "!right-1 !translate-x-full !bg-primary dark:!bg-white"
                          }`}
                        >
                          <span className={`hidden ${isCurrent && "!block"}`}>
                            <Check />
                          </span>
                          <span className={`${isCurrent && "hidden"}`}>
                            <X />
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <div className={`${isCurrent && "hidden"}`}>
                    <label className="mb-3 block text-black dark:text-white">
                      End Date
                    </label>
                    <Controller
                      control={control}
                      name="end_date"
                      render={({ field }) => (
                        <ReactDatePicker
                          placeholderText="Select end date"
                          disabled={isCurrent || isSubmitting}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          onChange={(date) => {
                            field.onChange(date);
                          }}
                          selected={field.value}
                        />
                      )}
                    />
                    <div className="invalid-feedback">
                      {errors.end_date?.message}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  rows={12}
                  disabled={isSubmitting}
                  {...register("description")}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                ></textarea>
                <div className="invalid-feedback">
                  {errors.description?.message}
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
                    {...register("type")}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                  >
                    {Object.values(WorkExperienceType).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <Pen />
                  </span>
                  <div className="invalid-feedback">{errors.type?.message}</div>
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
              href="/dashboard/experience"
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Back to experiences
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
