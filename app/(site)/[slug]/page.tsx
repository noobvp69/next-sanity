import { getPage, getPages } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";

// ✅ Generate static paths for build-time generation
export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// ✅ Generate dynamic metadata based on content
export async function generateMetadata(
  { params }: { params:Promise< { slug: string } >},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const page = await
  getPage(resolvedParams.slug);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: page.title,
    description: `Page for ${page.title}`,
    openGraph: {
      title: page.title,
      images: [
        {
          url: "/default-og-image.png", // change to a dynamic or real image if available
          alt: page.title,
        },
        ...previousImages,
      ],
    },
  };
}

// ✅ Actual page component
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const page = await getPage(resolvedParams.slug);

  return (
    <div className="text-lg text-gray-700 mt-10">
      <h1 className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
        {page.title}
      </h1>

      <PortableText value={page.content} />
    </div>
  );
}
