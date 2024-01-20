import React, { useState, useEffect } from "react";
import type { NextPage } from "next";

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
  postedAt: Date;
  updatedAt: Date | null;
  online: boolean;
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

  return (
    <>
      <h1>Jobs</h1>
      <main>
        {data.map((job, i) => (
          <div key={i}>
            <h1>{job.title}</h1>
            <p>{job.location}</p>
          </div>
        ))}
      </main>
    </>
  );
};

export default Page;
