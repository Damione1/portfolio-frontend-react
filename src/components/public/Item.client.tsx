import React from 'react';

export interface Post {
  id: string;
  title: string;
  subTitle: string;
  startDate: Date;
  endDate: Date;
  current: boolean;
  description: string;

  /** @deprecated */
  company: string;

  /** @deprecated */
  position: string;

  /** @deprecated */
  school: string;

  /** @deprecated */
  grade: string;
}


interface Props {
  post: Post;
}

const PublicItem: React.FC<Props> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(date);
  };

  post.subTitle = post.company || post.school;
  post.title = post.position || post.grade;

  return (
    <div className="p-4 w-full lg:w-1/3 sm:w-1/2 flex flex-col">
      <div className="flex-grow border-2 rounded-lg border-gray-200 dark:text-gray-300 border-opacity-50 p-8 sm:flex-row flex-col">
        <div className="flex-grow">
          <h3 className="mb-3">
            <div className="text-gray-900 dark:text-gray-400 text-xl title-font font-bold">
              {post.title}
            </div>
            <div className="text-gray-900 dark:text-gray-400 text-md title-font font-medium">
              {post.subTitle}
            </div>
          </h3>
          <p className="leading-relaxed text-base">
           {formatDate(post.startDate.toString())} - {post.current ? 'Present' : formatDate(post.endDate.toString())}
          </p>
          <p className="leading-relaxed text-base" style={{whiteSpace: "pre-line"}}>
            {post.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PublicItem
