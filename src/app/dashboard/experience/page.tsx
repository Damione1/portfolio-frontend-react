import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import Link from "next/link";
import { Metadata } from "next";
import ExperienceListing from "./listing";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Add or edit a Experiences",
};

export default function AdminExperiencesListing() {
  return (
    <div key="admin-experiences-listing">
      <Breadcrumb pageName="Experiences" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <ExperienceListing />
          </div>
        </div>
      </div>
      <Link
        href="/dashboard/experience/new"
        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-4"
      >
        Create a new experience
      </Link>
    </div>
  );
}
