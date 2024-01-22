"use client";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Badge } from "@/components/ui/badge";

interface JobData {
  title: string;
  location: string;
  skillsRequired: string[];
  jobDesignation: string;
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
}

const Page: NextPage = () => {
  const [data, setData] = useState<JobData[]>([]);
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

  function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <>
      <main className="mt-5">
        {data.map((job, i) => (
          <div key={i}>
            <div className="w-[570px] h-[235px] bg-slate-600 p-4 rounded-2xl shadow-slate-200 shadow-2xl ">
              <div className="flex flex-col space-y-2 mb-4 p-2 ml-0">
                <div className="space-y-1">
                  <h1 className="text-xl font-bold text-white">{job.title}</h1>
                  <h3 className="text-white">{job.location}</h3>
                </div>
                <div className="flex flex-col space-x-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white">{job.experience} yrs</h3>
                    <hr className="border-t border-white w-4 mx-2 rotate-90" />
                    <h3 className="text-white">Salary</h3>
                    <hr className="border-t border-white w-4 mx-2 rotate-90" />
                    <h3 className="text-white">{job.workType}</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white">{job.jobDesignation}</h4>
                    </div>
                    <div>
                      <h5 className="text-white space-x-2">
                        {job.skillsRequired.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {job.updatedAt ? (
                  <p>Updated At: {formatDate(job.updatedAt)}</p>
                ) : (
                  <p>Posted At: {formatDate(job.postedAt)}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default Page;
