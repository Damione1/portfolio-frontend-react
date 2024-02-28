"use client";
import Link from "next/link";
import { formatDate } from "@/helpers/date";
import { SkillItem } from "@/types/skill";
import { useEffect, useState } from "react";
import { deleteSkill, listSkills } from "@/clients/skills";
import Image from "next/image";
import { Loader2, Pencil, Trash2 } from "lucide-react";

export default function SkillsListing() {
  const [skillsList, setSkillsList] = useState([] as SkillItem[]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      const { error, skills } = await listSkills();
      if (error) {
        setIsFetching(false);
        setError(error);
        return;
      }
      setIsFetching(false);
      setSkillsList(skills);
    }
    fetchData();
  }, []);

  async function deleteThisSkill(id: number) {
    const updatedSkills = skillsList.filter((skill) => skill.id !== id);
    setSkillsList(updatedSkills);

    const { error } = await deleteSkill(id);
    if (error) {
      setSkillsList(skillsList);
      alert(`Api error: ${error}`);
    }
  }

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Skill
          </th>
          <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
            Thumbnail
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {skillsList.map((post, key) => (
          <tr key={key}>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {post.title}
              </h5>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                <Image
                  src={post.image.path}
                  width="50"
                  height="50"
                  alt={post.title}
                />
              </h5>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <Link
                  className="hover:text-primary"
                  href={`/dashboard/skill/${post.id}`}
                >
                  <Pencil />
                </Link>
                <button
                  className="hover:text-primary"
                  onClick={(e) => {
                    deleteThisSkill(post.id);
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
              <span className="animate-spin mr-4">
                <Loader2 />
              </span>
            </td>
          </tr>
        )}

        {skillsList.length === 0 && !isFetching && (
          <tr>
            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {error !== "" ? error : "No skills found"}
              </h5>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
