"use client";
import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import Link from "next/link"; // Import Link from 'next/link'
import { Badge } from "@/components/ui/badge";
import { formatSalaryRange } from "@/helpers/formatSalary";
import { formatDate } from "@/helpers/formatDate";

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
  workType: boolean;
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

  return (
    <>
      <div className="group mx-2 mt-4 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 shadow transition hover:shadow-lg sm:mx-auto">
        <Link
          href="#"
          passHref
          className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4"
        >
          <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
            <img
              src={data.companyLogo ?? "/default-logo.png"} // Use a default value if companyLogo is null
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
          <p className="overflow-hidden pr-2 text-sm">{data.jobDescription}</p>
          <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
            <div>
              Experience:
              <span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900">
                {data.experience}
              </span>
            </div>
            <div>
              Salary:
              <span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">
                {formatSalaryRange(data.salary)}
              </span>
            </div>
          </div>
          <div>
            <h5 className="text-white space-x-2 mt-2">
              {data.skillsRequired.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </h5>
          </div>
          <div className="flex mt-2 items-center text-sm font-medium text-gray-500">
            <p>
              {data.updatedAt ? "Updated At: " : "Published At: "}
              {formatDate(data.updatedAt ?? data.postedAt)}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold">{data.title}</h1>
        <p>Company: {data.companyName}</p>
        <p>Location: {data.location}</p>
        <p>
          Salary: ${data.salary[0]} - ${data.salary[1]}
        </p>
        <p>Job Description: {data.jobDescription}</p>
        <p>Education Qualification: {data.educationQualification}</p>
        <p>Experience: {data.experience} years</p>
        <p>Freshers Eligible: {data.freshersEligible ? "Yes" : "No"}</p>
        <p>Verified: {data.isVerified ? "Yes" : "No"}</p>
        <p>Available: {data.isAvailable ? "Yes" : "No"}</p>
        <p>Work Type: {data.workType ? "Remote" : "On-site"}</p>
        <p>Internship: {data.internship ? "Yes" : "No"}</p>
        <p>Posted At: {new Date(data.postedAt).toLocaleDateString()}</p>

        <div>
          <h2 className="text-lg font-semibold">Skills Required:</h2>
          <ul>
            {data.skillsRequired.map((skill, index) => (
              <li key={index} className="list-disc ml-4">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {data.updatedAt && (
          <p>Updated At: {new Date(data.updatedAt).toLocaleDateString()}</p>
        )}
        {data.internship && <p>This is an internship position.</p>}
        <Link href="/some-page">
          <img
            src={data.companyLogo ?? "/default-logo.png"}
            alt={`${data.companyName} Logo`}
            className="h-full w-full object-cover text-gray-700"
          />
        </Link>
      </div>
    </>
  );
};

export default Page;
