"use client";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { formatSalaryRange } from "@/helpers/formatSalary";
import { formatDate } from "@/helpers/formatDate";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

interface PageProps {
  searchParams: { search: string };
}

const Page: NextPage<PageProps> = ({ searchParams }) => {
  const [data, setData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const search = useSearchParams().get("search");
  const [workType, setWorkType] = useState([]);
  const work = [
    { work: "Remote", isChecked: false },
    { work: "On Site", isChecked: false },
    { work: "Hybrid", isChecked: false },
  ];

  useEffect(() => {
    setWorkType(work);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempFilter = workType.map((user) => {
        return { ...user, isChecked: checked };
      });
      setWorkType(tempFilter);
    } else {
      let tempFilter = workType.map((user) =>
        user.work === name ? { ...user, isChecked: checked } : user
      );
      setWorkType(tempFilter);
    }
    const filter=workType
    console.log(filter); 
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(search);
      const res = await axios.get("/api/jobs", { params: { search: search } });
      if (res.status === 200) {
        const responseData = res.data;
        console.log("API Response Data:", responseData);
        const fetchedData = responseData.result || [];
        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else {
          console.error("Data is not an array:", fetchedData);
          setError("Data is not an array");
        }
      } else {
        console.error("Failed to fetch data");
        setError("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleClick = (jobId: any) => {
    router.push(`/jobs/${jobId}`);
  };

  return (
    <>
      <div className="flex flex-row">
        {/*Side bar Menu */}
        <div className="flex">
          <div className="h-[39vw] bg-gray-900 text-white p-[8px] w-[15vw] overflow-hidden flex flex-col m-4 rounded-xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  <div className="container my-4" style={{ width: "500px" }}>
                    <form className="form w-100">
                      <h3>Work Type</h3>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="allSelect"
                          // checked={
                          //   users.filter((user) => user?.isChecked !== true).length < 1
                          // }
                          checked={
                            !workType.some((work) => work?.isChecked !== true)
                          }
                          onChange={handleChange}
                        />
                        <label className="form-check-label ms-2">
                          Select All
                        </label>
                      </div>
                      {workType.map((work, index) => (
                        <div className="form-check" key={index}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name={work.work}
                            checked={work?.isChecked || false}
                            onChange={handleChange}
                          />
                          <label className="form-check-label ms-2">
                            {work.work}
                          </label>
                        </div>
                      ))}
                    </form>
                  </div>
                </AccordionContent>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <main className="mt-5 p-5 max-h-screen overflow-auto">
          {error ? (
            <h1>error</h1>
          ) : loading ? (
            <div className="flex flex-col space-y-7">
              {Array(8)
                .fill()
                .map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px] bg-gray-200" />
                      <Skeleton className="h-4 w-[200px] bg-gray-200" />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              {data.map((job, i) => {
                return (
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
                        <h3 className="text-sm text-gray-600">
                          {job.companyName}
                        </h3>
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
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Page;
