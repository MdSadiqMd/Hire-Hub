"use client";
import React from "react";
import { Banner } from "@/components/ui/banner";

const JobLayout: React.FC<{ children?: React.ReactNode }> = (props) => {
  return (
    <div>
      <Banner />
      <div>{props.children}</div>
    </div>
  );
};

export default JobLayout;