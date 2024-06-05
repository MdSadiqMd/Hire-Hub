"use client";

import Script from "next/script";
import React from "react";

type AdSenseTypes = {
  pId: string;
};

const AdSense = ({ pId }: AdSenseTypes) => {
  return (
    <Script
      async
      rel="preload"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
};

export default AdSense;
