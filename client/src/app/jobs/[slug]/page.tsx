"use client";
import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import Link from "next/link";
import { formatSalaryRange } from "@/helpers/formatSalary";
import { formatDate } from "@/helpers/formatDate";
import { Button } from "@/components/ui/button";
import { LocationMarkerIcon } from "@heroicons/react/solid";

interface JobData {
  title: string;
  companyName: string;
  location: string;
  salary: number[];
  skillsRequired: string[];
  jobDescription: string;
  educationQualification: string;
  experience: number;
  freshersEligible: boolean;
  isVerified: boolean;
  isAvailable: boolean;
  online: boolean;
  postedAt: Date;
  updatedAt: Date | null;
  workType: string[];
  internship: boolean;
  companyLogo: string | null;
}

interface PageProps {
  params: { slug: string };
}

const Page: FC<PageProps> = ({ params }) => {
  const [data, setData] = useState<JobData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/jobs/${params.slug}`, {
          params: { slug: params.slug },
        });
        console.log(res);
        setData(res.data.result);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchData();
  }, [params.slug]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const badgeStyles = [
    "bg-gray-50 text-gray-600 ring-gray-500/10",
    "bg-red-50 text-red-700 ring-red-600/10",
    "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
    "bg-green-50 text-green-700 ring-green-600/20",
    "bg-blue-50 text-blue-700 ring-blue-700/10",
    "bg-indigo-50 text-indigo-700 ring-indigo-700/10",
    "bg-purple-50 text-purple-700 ring-purple-700/10",
    "bg-pink-50 text-pink-700 ring-pink-700/10",
  ];

  const badgeColors = badgeStyles.map((style) => style.split(" ")[1]);

  return (
    <>
      <div className="group mx-2 mt-4 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-6 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
        <Link
          href="#"
          passHref
          className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
        >
          <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
            <img
              src={data.companyLogo ?? "/default-logo.png"}
              alt=""
              className="h-full w-full object-cover text-gray-700"
            />
          </div>
        </Link>
        <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
          <h3 className="text-sm text-gray-600">{data.companyName}</h3>
          <Link
            href="#"
            className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
          >
            {data.title}
          </Link>
          <p className="overflow-hidden pr-2 text-sm"><LocationMarkerIcon className="h-5 w-5 text-gray-500" />{data.location}</p>
          <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
            <div>
              Experience:
              <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                {data.experience}
              </span>
            </div>
            <div>
              Salary:
              <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0 text-blue-900">
                {formatSalaryRange(data.salary)}
              </span>
            </div>
          </div>
          <br />
          <hr />
          <div className="p-1 space-y-2 flex flex-row justify-between">
            <div className="flex mt-2 left-0 items-center text-sm font-medium text-gray-500">
              <p>
                {data.updatedAt ? "Updated At: " : "Published At: "}
                {formatDate(data.updatedAt ?? data.postedAt)}
              </p>
            </div>
            <Button>Apply Now</Button>
          </div>
        </div>
      </div>
      <div className="group mx-2 mt-4 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-600 shadow transition hover:shadow-lg sm:mx-auto">
        <div className="col-span-11 flex flex-col pr-8 text-left text-base sm:pl-4">
          <h1 className="text-bold text-lg text-gray-700 font-extrabold">
            Job Description
          </h1>
          <div className="p-1">
            <h3>{data.jobDescription}</h3>
            <h2>
              <span className="font-semibold">Role:</span> {data.title}
            </h2>
            <h2>
              <span className="font-semibold">Employment Type:</span>{" "}
              {data.workType}
            </h2>
            <h2>
              <span className="font-semibold">Role Category:</span> Software
            </h2>
            <h2>
              <span className="font-semibold">Education Qualifications:</span>{" "}
              <br />
              {data.educationQualification}
            </h2>
            <h2>
              <span className="font-semibold">Freshers Eligible:</span>{" "}
              {data.freshersEligible}
            </h2>
            <h2>
              <span className="font-semibold">To Know More Visit: </span>{" "}
              <Link
                href={`http://www.${data.companyName.toLowerCase()}.com/careers`}
                target="_blank"
                passHref
              >
                {`www.${data.companyName.toLowerCase()}.com/careers`}
              </Link>
            </h2>
            <div>
              <span className="font-semibold">Key Skills:</span> <br />
              <h5 className="text-white space-x-2 mt-2 flex flex-row">
                {data.skillsRequired.map((skill, index) => (
                  <div key={index}>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        badgeStyles[index % badgeStyles.length]
                      }`}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
