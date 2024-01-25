"use server";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { getProjects } from "./_operations";
import Listing from "./(components)/_listing";
import { notFound } from "next/navigation";
import Link from "next/link";


export default async function AdminProjectsListing() {
  const { posts, error } = await getProjects();

  return (
    <div key="admin-projects-listing">
      <Breadcrumb pageName="Projects" />
      <div className="flex flex-col gap-10">
        {error ? <div>Error loading posts: {error}</div> :
          <Listing posts={posts} />
        }
      </div>
      <Link href="/dashboard/project/new" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
        Create a new project
      </Link>
    </div>
  );
};
