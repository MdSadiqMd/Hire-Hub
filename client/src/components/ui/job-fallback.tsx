"use client";
import React from "react";

const LoadingBlock = ({ width }: any) => (
  <div
    className={`block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 dark:bg-gray-600 rounded-full text-inherit ${width}`}
  >
    &nbsp;
  </div>
);

const JobFallback = () => {
  const repeatCount = 7;
  const svgIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-16 h-16 bg-gray-300 dark:bg-gray-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col space-y-10">
        <div className="border bg-gray-100 dark:bg-gray-900 shadow p-6">
          <div className="flex flex-wrap items-center gap-8 animate-pulse">
            <div className="grid bg-gray-300 dark:bg-gray-600 rounded-lg h-24 w-24 place-items-center">
              {svgIcon}
            </div>
            <div className="w-max">
              <div className="block w-64 h-4 mb-6 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 dark:bg-gray-600 rounded-full text-inherit">
                &nbsp;
              </div>
              {[...Array(repeatCount)].map((_, index) => (
                <LoadingBlock key={index} width="w-80" />
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-full animate-pulse border bg-gray-100 dark:bg-gray-900 p-6">
          <div className="block w-64 h-4 mb-6 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 dark:bg-gray-600 rounded-full text-inherit">
            &nbsp;
          </div>
          {[...Array(repeatCount)].map((_, index) => (
            <LoadingBlock key={index} width="w-80" />
          ))}
        </div>
        <div className="max-w-full animate-pulse border bg-gray-100 dark:bg-gray-900 p-6">
          <div className="block w-64 h-4 mb-6 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 dark:bg-gray-600 rounded-full text-inherit">
            &nbsp;
          </div>
          {[...Array(repeatCount)].map((_, index) => (
            <LoadingBlock key={index} width="w-80" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobFallback;
