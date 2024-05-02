"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import type { NextPage } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
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
  const router = useRouter();
  const [data, setData] = useState<JobData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [sideBarClose, setSideBarClose] = useState(false);
  const search = useSearchParams().get("search");
  const [experience, setExperience] = useState(-1);
  const [filteredData, setFilteredData] = useState({
    work: [
      { work: "Internship", isChecked: false },
      { work: "Remote", isChecked: false },
      { work: "On-Site", isChecked: false },
      { work: "Hybrid", isChecked: false },
    ],
    salary: [
      { salary: "50k", isChecked: false },
      { salary: "90k", isChecked: false },
      { salary: "110k", isChecked: false },
      { salary: "130k", isChecked: false },
    ],
  });

  useEffect(() => {
    fetchData();
  }, [search, filteredData, experience]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/jobs", {
        params: {
          search: search,
          workType: filteredData.work
            .filter((item) => item.isChecked)
            .map((item) => item.work)
            .join(","),
          salary: filteredData.salary
            .filter((item) => item.isChecked)
            .map((item) => item.salary)
            .join(","),
          experience: experience,
        },
      });
      if (res.status === 200) {
        setData(res.data.result || []);
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

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      const sliderValue = parseInt(value[0].toString(), 10);
      setExperience(sliderValue);
      updateUrlParams({ experience: sliderValue });
    } else {
      const sliderValue = parseInt(value.toString(), 10);
      setExperience(sliderValue);
      updateUrlParams({ experience: sliderValue });
    }
  };

  const handleChange = (type: string, index: number) => {
    const updatedData = { ...filteredData };
    if (type === "work") {
      updatedData.work[index].isChecked = !updatedData.work[index].isChecked;
    } else if (type === "salary") {
      updatedData.salary[index].isChecked =
        !updatedData.salary[index].isChecked;
    }
    setFilteredData(updatedData);
    const workType = updatedData.work
      .filter((item) => item.isChecked)
      .map((item) => item.work)
      .join(",");
    const salary = updatedData.salary
      .filter((item) => item.isChecked)
      .map((item) => item.salary)
      .join(",");
    updateUrlParams({ workType, salary });
  };

  const isMobile = useMediaQuery({ maxWidth: 768 });
  React.useEffect(() => {
    if (isMobile) {
      setSideBar(true);
    } else {
      setSideBar(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 580) {
        setSideBar(false);
      } else {
        setSideBar(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const clearExperience = () => {
    setExperience(-1);
    const slider = document.getElementById(
      "experienceSlider"
    ) as HTMLInputElement;
    if (slider) {
      slider.value = "-1";
    }
    updateUrlParams({ experience: null });
  };

  const updateUrlParams = (params: any) => {
    const queryParams = {
      search,
      ...params,
    };
    Object.keys(queryParams).forEach((key) => {
      if (!queryParams[key] && key !== "search") {
        delete queryParams[key];
      }
    });
    const queryString = new URLSearchParams(queryParams).toString();
    router.push(`/jobs?${queryString}`);
  };

  const handleClick = (jobId: any) => {
    router.push(`/jobs/${jobId}`);
  };

  const toggleSidebar = () => {
    setSideBar(!sideBar);
    setSideBarClose(!sideBarClose);
  };

  return (
    <>
      <div className="flex flex-row">
        {/* Side bar Menu */}
        <div className="self-start shadow transition hover:shadow-md z-40 ml-1 md:m-5 lg:m-5 lg:mr-1 rounded-2xl dark:bg-gray-800 lg:w-1/4 lg:h-full">
          {!sideBar && (
            <div className="absolute lg:fixed  h-full w-100% bg-#020817/50 backdrop-blur-sm lg:backdrop-blur-none lg:w-full lg:sticky">
              <div className="flex lg:border-gray-1200 border-2 border-solid border-red lg:border-0">
                <div
                  className={`h-[100vw] md:h-[50vw] bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 p-[8px] w-[90vw] lg:w-[80vw] overflow-y-auto flex flex-col m-4  rounded-xl ${
                    !sideBar ? "block" : "hidden"
                  }`}
                >
                  {sideBarClose && (
                    <button
                      onClick={toggleSidebar}
                      className="justify-between text-3xl py-2 px-4 lg:hidden"
                    >
                      <b>X</b>
                    </button>
                  )}
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Work Type</AccordionTrigger>
                      <AccordionContent>
                        <div
                          className="container my-4"
                          style={{ width: "500px" }}
                        >
                          <form className="form w-100">
                            {filteredData.work.map((item, index) => (
                              <div className="form-check" key={index}>
                                <input
                                  type="checkbox"
                                  className="form-check-input rounded-sm"
                                  name={item.work}
                                  checked={item.isChecked}
                                  onChange={() => handleChange("work", index)}
                                />
                                <label className="form-check-label ms-2">
                                  {item.work}
                                </label>
                              </div>
                            ))}
                          </form>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Salary</AccordionTrigger>
                      <AccordionContent>
                        <div
                          className="container my-4"
                          style={{ width: "500px" }}
                        >
                          <form className="form w-100">
                            {filteredData.salary.map((item, index) => (
                              <div className="form-check" key={index}>
                                <input
                                  type="checkbox"
                                  className="form-check-input rounded-sm"
                                  name={item.salary}
                                  checked={item.isChecked}
                                  onChange={() => handleChange("salary", index)}
                                />
                                <label className="form-check-label ms-2">
                                  {item.salary}
                                </label>
                              </div>
                            ))}
                          </form>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Experience</AccordionTrigger>
                      <AccordionContent>
                        <div className="p-5 space-y-5">
                          <Button onClick={() => clearExperience()}>
                            Clear Experience Filter
                          </Button>
                          <Slider
                            onValueChange={handleSliderChange}
                            step={1}
                            min={-1}
                            max={6}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
            
          )}
        </div>
        {/* Main Content */}
        <main className=" mt-5 p-2 pl-0 lg:pl-2 pt-0 max-h-screen overflow-auto">
          {error ? (
            <h1>error</h1>
          ) : loading ? (
            <div className="flex flex-col space-y-7">
              {Array(8)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px] bg-gray-200 dark:bg-gray-700" />
                      <Skeleton className="h-4 w-[200px] bg-gray-200 dark:bg-gray-700" />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col justify-start content-center  ">
              <div className="w-[90%] bg-[#020817] self-end absolute mb-5">
                {sideBar && (
                  <Button
                    className="bg-transparent lg:hidden hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-[80%]"
                    onClick={toggleSidebar}
                  >
                    Filters
                  </Button>
                )}
              </div>
              {data.map((job, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => handleClick(job._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="group mx-2 mt-5 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-gray-700 dark:text-gray-300 shadow transition hover:shadow-lg sm:mx-auto">
                      <Link
                        href="#"
                        passHref
                        className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 dark:text-gray-400 hover:text-gray-700 sm:-order-1 sm:ml-4"
                      >
                        <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
                          <img
                            src={job.companyLogo ?? "/default-logo.png"} // Use a default value if companyLogo is null
                            alt=""
                            className="h-full w-full object-cover text-gray-700 dark:text-gray-300"
                          />
                        </div>
                      </Link>
                      <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
                        <h3 className="text-sm text-gray-600 dark:text-gray-400">
                          {job.companyName}
                        </h3>
                        <Link
                          href="#"
                          className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl"
                        >
                          {job.jobtitle}
                        </Link>
                        <p className="overflow-hidden pr-2 text-sm line-clamp-3 truncate">
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
