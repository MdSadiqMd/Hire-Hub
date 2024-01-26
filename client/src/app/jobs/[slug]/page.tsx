"use client";
import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';

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
        const res = await axios.get(`/api/jobs/${params.slug}`, { params: { slug: params.slug } });
        console.log(res);
        setData(res.data.result);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };
    fetchData();
  }, [params.slug]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.skillsRequired.map((skill, index) => (
        <div key={index} className="bg-gray-200 p-4 my-4 rounded">
          <h1 className="text-xl font-bold">{data.title}</h1>
          <p>Company: {data.companyName}</p>
          <p>Location: {data.location}</p>
          <p>Salary: ${data.salary[0]} - ${data.salary[1]}</p>
          <p>Skills Required: {skill}</p>
          <p>Job Description: {data.jobDescription}</p>
          <p>Education Qualification: {data.educationQualification}</p>
          <p>Experience: {data.experience} years</p>
          <p>Freshers Eligible: {data.freshersEligible ? 'Yes' : 'No'}</p>
          <p>Verified: {data.isVerified ? 'Yes' : 'No'}</p>
          <p>Available: {data.isAvailable ? 'Yes' : 'No'}</p>
          <p>Work Type: {data.workType}</p>
          <p>Internship: {data.internship ? 'Yes' : 'No'}</p>
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
          {data.updatedAt && <p>Updated At: {new Date(data.updatedAt).toLocaleDateString()}</p>}
          <p>Work Type: {data.workType ? 'Remote' : 'On-site'}</p>
          {data.internship && <p>This is an internship position.</p>}
          <img src={data.companyLogo} alt={`${data.companyName} Logo`} />
        </div>
      ))}
    </div>
  );
};

export default Page;
