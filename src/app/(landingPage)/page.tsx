import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("landing_page").catch(() => notFound());

  return (
    <>
      {/* Additional SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Tayyab Portfolio",
            description:
              "Professional Full Stack Developer Portfolio showcasing React, Next.js, TypeScript projects",
            url: "https://eviorcode.online",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://eviorcode.online/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("landing_page").catch(() => notFound());

  // Force the title to be our SEO-optimized title, ignoring Prismic's meta_title
  const seoTitle =
    "Tayyab - Full Stack Developer | React, Next.js, TypeScript Expert";
  const seoDescription =
    "Professional Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. View portfolio, projects, and hire for web development services.";

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "Full Stack Developer",
      "React Developer",
      "Next.js Developer",
      "TypeScript Developer",
      "Web Developer",
      "Frontend Developer",
      "Backend Developer",
      "Portfolio",
      "Hire Developer",
      "Web Development Services",
      "JavaScript Developer",
      "Node.js Developer",
      "UI/UX Developer",
      "Freelance Developer",
      "React Portfolio",
      "Next.js Portfolio",
      "Developer Portfolio",
      "Web Development Portfolio",
    ],
    authors: [{ name: "Tayyab" }],
    creator: "Tayyab",
    publisher: "Tayyab Portfolio",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://eviorcode.online"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://eviorcode.online",
      title: seoTitle,
      description: seoDescription,
      siteName: "Tayyab Portfolio",
      images: [
        {
          url: asImageSrc(page.data.meta_image) || "/banner.png",
          width: 1200,
          height: 630,
          alt: "Tayyab - Full Stack Developer Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [asImageSrc(page.data.meta_image) || "/banner.png"],
      creator: "@yourtwitterhandle", // Replace with your Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code", // Replace with your Google Search Console verification code
    },
  };
}
