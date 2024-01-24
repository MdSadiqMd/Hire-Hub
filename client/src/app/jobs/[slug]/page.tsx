import type { NextPage } from "next";
import { useRouter } from "next/router";

const Page: NextPage = (params:any) => {
  const router = useRouter();

  // Get the query parameter from the URL
  const { keyword } = router.query;

  return (
    <div>
      The Search Keyword {keyword}.
    </div>
  );
};

export default Page;
