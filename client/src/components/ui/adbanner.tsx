"use client";

import React, { useEffect } from "react";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};
interface Window {
  adsbygoogle: { [key: string]: unknown }[];
}
{
  /* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8144091131283360"
     crossorigin="anonymous"></script>
<!-- adsbygoogle -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8144091131283360"
     data-ad-slot="1807507629"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script> */
}
const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}: AdBannerTypes) => {
  useEffect(() => {
    const handleAds = () => {
      try {
        let adsbygoogle: Window;
        (adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error) {
        console.log(error);
      }
    };

    const scriptExists = document.querySelector(
      `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`
    );
    if (!scriptExists) {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.onload = handleAds;
      document.head.appendChild(script);
    } else {
      handleAds();
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8144091131283360"
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    ></ins>
  );
};

export default AdBanner;
