import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import Link from "next/link";
import { Metadata } from "next";
import ProjetListing from "./listing";

export const metadata: Metadata = {
  title: "posts",
  description: "Add or edit a post",
};

export default function AdminpostsListing() {
  return (
    <div key="admin-posts-listing">
      <Breadcrumb pageName="posts" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <ProjetListing />
          </div>
        </div>
      </div>
      <Link
        href="/dashboard/post/new"
        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-4"
      >
        Create a new post
      </Link>
    </div>
  );
}
