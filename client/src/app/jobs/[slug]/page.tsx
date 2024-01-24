"use client";

function Page({ params }: { params: { slug: string } }) {
  return <div>The Search Keyword {params.slug}.</div>;
}

export default Page;
