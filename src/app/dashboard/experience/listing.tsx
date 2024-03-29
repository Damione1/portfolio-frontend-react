"use client";

import Link from "next/link";
import { formatDate } from "@/helpers/date";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteExperience, listExperiences } from "@/clients/experience";
import { ExperienceItem, ExperienceType } from "@/types/experience";

const getButtonStyles = (type: string) => {
  switch (type as ExperienceType) {
    case ExperienceType.Work:
      return "inline-flex rounded bg-[#F9C107] py-1 px-2 text-sm font-medium text-[#212B36] hover:bg-opacity-90";
    case ExperienceType.Education:
      return "inline-flex rounded bg-[#3CA745] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90";
    case ExperienceType.Internship:
      return "inline-flex rounded bg-[#3BA2B8] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90";
    case ExperienceType.Volunteer:
      return "inline-flex rounded bg-[#3BA2B8] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90";
    default:
      return "inline-flex rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90"; // default styles
  }
};

export default function ExperienceListing() {
  const [experiencesList, setExperiencesList] = useState(
    [] as ExperienceItem[]
  );
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      const { error, experiences } = await listExperiences();
      if (error) {
        setIsFetching(false);
        setError(error);
        return;
      }
      setIsFetching(false);
      setExperiencesList(experiences);
    }
    fetchData();
  }, []);

  async function deleteThisExperience(id: number) {
    const updatedExperiences = experiencesList.filter(
      (experience) => experience.id !== id
    );
    setExperiencesList(updatedExperiences);

    const { error } = await deleteExperience(id);
    if (error) {
      setExperiencesList(experiencesList);
      alert(`Api error: ${error}`);
    }
  }

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
            Status
          </th>
          <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
            Title
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Created At
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Updated At
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {experiencesList.map((post, key) => (
          <tr key={key}>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <button className={getButtonStyles(post.type)}>
                {post.type}
              </button>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {post.title}
              </h5>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {post.created_at !== ""
                  ? formatDate(post.created_at.toString(), true)
                  : "N/A"}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {post.updated_at !== ""
                  ? formatDate(post.updated_at.toString(), true)
                  : "N/A"}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <Link
                  className="hover:text-primary"
                  href={`/dashboard/experience/${post.id}`}
                >
                  <Pencil />
                </Link>
                <button
                  className="hover:text-primary"
                  onClick={(e) => {
                    deleteThisExperience(post.id);
                  }}
                >
                  <Trash2 />
                </button>
              </div>
            </td>
          </tr>
        ))}

        {isFetching && (
          <tr>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                Loading
              </h5>
            </td>
          </tr>
        )}

        {experiencesList.length === 0 && !isFetching && (
          <tr>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {error !== "" ? error : "No experiences found"}
              </h5>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
