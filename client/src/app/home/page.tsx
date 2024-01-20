"use client";
import type { NextPage } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Page: NextPage = () => {
  return (
    <>
      <section className="bg-gray-900 h-screen w-full overflow-full flex items-center justify-center scrollbar-hide">
        <div className="grid max-w-screen-xl px-4 lg:gap-8 xl:gap-0 lg:grid-cols-12">
          <div className="flex flex-col justify-center lg:col-span-7">
            <h1 className="max-w-2xl mb-6 text-4xl font-extrabold tracking-wide leading-none md:text-5xl xl:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] via-[#e0e7ff] to-[#38bdf8]">
              Connecting Talent Globally
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Elevate Hiring with Hire Hub. Simplify recruitment globally, from
              application to integration.
            </p>

            <div className="flex flex-col lg:flex-row space-x-10">
              <Button variant="primary" className="h-12 border-white">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 mb-2 lg:mb-0 lg:mr-3 text-base font-medium text-center text-white"
                >
                  Learn Courses
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </Button>

              <Button variant="primary" className="h-12  border-white">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white"
                >
                  Find Jobs
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:mt-[-20%] lg:col-span-5 lg:flex">
            <Image
              src="/hero.svg"
              alt="mockup"
              width={2000}
              height={2000}
              className="w-[40vw] h-auto scale-150"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
