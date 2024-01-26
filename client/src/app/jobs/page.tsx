"use client";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatSalaryRange } from "@/helpers/formatSalary";
import { formatDate } from "@/helpers/formatDate";

interface JobData {
  [x: string]: any;
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
  workType: boolean;
  internship: boolean;
  companyLogo: string | null;
}

const Page: NextPage = () => {
  const [data, setData] = useState<JobData[]>([]);
  const router = useRouter();
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/jobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const responseData = await res.json();
        console.log("API Response Data:", responseData);
        const fetchedData = responseData.result || [];

        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else {
          console.error("Data is not an array:", fetchedData);
        }
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleClick = (jobId: any) => {
    router.push(`/jobs/${jobId}`);
  };

  return (
    <>
      <main className="mt-5">
        {data.map((job, i) => (
          <div
            key={i}
            onClick={() => handleClick(job._id)}
            style={{ cursor: "pointer" }}
          >
            <div className="group mx-2 mt-4 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
              <Link
                href="#"
                passHref
                className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
              >
                <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
                  <img
                    src={job.companyLogo ?? "/default-logo.png"} // Use a default value if companyLogo is null
                    alt=""
                    className="h-full w-full object-cover text-gray-700"
                  />
                </div>
              </Link>
              <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                <h3 className="text-sm text-gray-600">{job.companyName}</h3>
                <Link
                  href="#"
                  className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
                >
                  {job.title}
                </Link>
                <p className="overflow-hidden pr-2 text-sm">
                  {job.jobDescription}
                </p>
                <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                  <div>
                    Experience:
                    <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                      {job.experience}
                    </span>
                  </div>
                  <div>
                    Salary:
                    <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                      {formatSalaryRange(job.salary)}
                    </span>
                  </div>
                </div>
                <div>
                  <h5 className="text-white space-x-2 mt-2">
                    {job.skillsRequired.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </h5>
                </div>
                <div className="flex mt-2 items-center text-sm font-medium text-gray-500">
                  <p>
                    {job.updatedAt ? "Updated At: " : "Published At: "}
                    {formatDate(job.updatedAt ?? job.postedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default Page;
