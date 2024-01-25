"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface JobData {
  _id: string;
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

export default function Page() {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [data, setData] = useState<JobData[]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/job', { params: { id } });

      if (res.status === 200) {
        const responseData = res.data;
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
  }, [id]);

  return (
    <>
      {data.map((item) => (
        <div key={item._id}>
          <h1>{item.title}</h1>
          <p>{item.companyName}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </>
  );
}
