"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}: AdBannerTypes) => {
  const searchParams = useSearchParams();
  const adsLoaded = useRef<any>(false);

  useEffect(() => {
    const loadAd = () => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle) {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
          adsLoaded.current = true;
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (searchParams && !adsLoaded.current) {
      setTimeout(loadAd, 0);
    }
  }, [searchParams]);

  return (
    <ins
      className="adsbygoogle adbanner-customize"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8144091131283360"
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    ></ins>
  );
};

export default AdBanner;
