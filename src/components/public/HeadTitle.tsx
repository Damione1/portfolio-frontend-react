import React from 'react';

interface Props {
  mainTitle: string;
  subTitle: string;
}

const HeadTitle: React.FC<Props> = ({ mainTitle, subTitle }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="pt-40 pb-20 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative flex items-center justify-center mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-2xl">
            <h1 className="text-4xl md:text-6xl font font-extrabold tracking-tight text-gray-800 dark:text-gray-300" style={{whiteSpace: "pre-line"}}>
              {mainTitle}
            </h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-500">
              {subTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeadTitle;
