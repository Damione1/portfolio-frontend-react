import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import Link from "next/link";
import { Metadata } from "next";
import SkillsListing from "./skill-listing";

export const metadata: Metadata = {
  title: "Skills",
  description: "Add or edit a skill",
};

export default function AdminSkillsListing() {
  return (
    <div key="admin-skills-listing">
      <Breadcrumb pageName="Skills" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <SkillsListing />
          </div>
        </div>
      </div>
      <Link
        href="/dashboard/skill/new"
        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-4"
      >
        Create a new skill
      </Link>
    </div>
  );
}
