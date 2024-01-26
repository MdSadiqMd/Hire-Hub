"use client";
import React from "react";
import { Navbar } from "@/components/ui/navbar";
import { Banner } from "@/components/ui/banner";

const JobsLayout: React.FC<{ children?: React.ReactNode }> = (props) => {
  return (
    <div>
      <Navbar />
      <Banner />
      <div>{props.children}</div>
    </div>
  );
};

export default JobsLayout;
