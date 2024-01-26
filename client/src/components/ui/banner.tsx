"use client"
import Link from "next/link";
import { useState } from "react";
import Image from "next/image"; 

export const Banner: React.FC<{ children?: React.ReactNode }> = (props) => {
  const [display, setDisplay] = useState(true);

  const handleBanner = () => {
    setDisplay(!display);
  };

  return (
    <>
      {display && (
        <div
          id="marketing-banner"
          className="fixed z-100 flex flex-col md:flex-row justify-between w-[calc(50%-2rem)] p-4 -translate-x-1/2 bg-slate-800 border border-gray-700 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 light:bg-slate-100 light:border-gray-100"
        >
          <div className="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
            <Link
              href="#"
              className="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600"
            >
              <Image
                src="/banner.svg"
                alt="mockup"
                width={50}
                height={40}
                className="scale-150"
              />
            </Link>
            <p className="flex items-center text-sm font-normal text-gray-300 dark:text-gray-400">
              Post a job now and tap into a pool of exceptional talent!
            </p>
          </div>
          <div className="flex items-center flex-shrink-0">
            <a
              href="#"
              className="px-5 py-2 me-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Post Job
            </a>
            <button
              data-dismiss-target="#marketing-banner"
              type="button"
              className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-500 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleBanner}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close banner</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
