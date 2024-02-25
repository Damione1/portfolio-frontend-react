"use client";
import { PostItem, PostStatus } from "@/types/post";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postInput, postSchema } from "./validations";
import Link from "next/link";
import ImageUploadForm from "@/components/Images/ImageUploadForm";
import { useRouter } from "next/navigation";

import { File, Loader2, Pen } from "lucide-react";
import { createPost, updatePost } from "@/clients/posts";

export function AddEdit({ post }: { post: PostItem | null }) {
  const router = useRouter();
  const isAddMode = !post;
  const defaultValues = isAddMode
    ? {
        title: "",
        excerpt: "",
        content: "",
        cover_image_id: 0,
        status: PostStatus.Draft,
      }
    : {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        cover_image_id: post.cover_image?.id ?? 0,
        status: post.status,
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
  } = useForm<postInput>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  async function onSubmit(fields: postInput) {
    const postPayload = {
      title: fields.title,
      excerpt: fields.excerpt,
      content: fields.content,
      cover_image_id: fields.cover_image_id > 0 ? fields.cover_image_id : null,
      status: fields.status,
    } as PostItem;

    if (isAddMode) {
      const res = await createPost(postPayload);
      if (res.error) {
        console.error("Error creating post", res.error);
        return;
      }
      if (res.post) {
        router.push(`/dashboard/post/${res.post.id}`);
      }
    } else {
      await updatePost(post.id, postPayload);
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
                    {Object.values(PostStatus).map((status) => (
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
              href="/dashboard/post"
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Back to posts
            </Link>
          </div>
        </form>
      </div>
      <div className="col-span-5 xl:col-span-2">
        <ImageUploadForm
          defaultImage={post?.cover_image ?? null}
          setImageId={setImageId}
          title="post Cover Image"
          subtitle="Upload a cover image for your post"
        ></ImageUploadForm>
      </div>
    </div>
  );
}
