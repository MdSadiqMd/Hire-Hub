"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Banner } from "@/components/ui/banner";

const JobLayout: React.FC<{ children?: React.ReactNode }> = (props) => {
  const [sideBar, setSideBar] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    if (isMobile) {
      setSideBar(true);
    } else {
      setSideBar(false);
    }
  }, []);
  return (
    <div>
      {!sideBar && <Banner />}
      <div>{props.children}</div>
    </div>
  );
};

export default JobLayout;