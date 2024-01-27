"use client";
import React from "react";
import { Navbar } from "@/components/ui/navbar";
import { Banner } from "@/components/ui/banner";

interface JobsLayoutProps {
  children?: React.ReactNode;
  search?: string;
}

const JobsLayout: React.FC<JobsLayoutProps> = (props) => {
  return (
    <div>
      <Navbar search={props.search} />
      <Banner />
      <div>{props.children}</div>
    </div>
  );
};

export default JobsLayout;
