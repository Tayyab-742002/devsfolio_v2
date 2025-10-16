import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Comic_Neue } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/general/MainWrapper";
import { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { ErrorBoundary } from "@/components/general/ErrorBoundary";
import { Analytics } from "@vercel/analytics/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false, // Don't preload on mobile to avoid FOUT
});

// Initialize EmailJS
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

export const metadata: Metadata = {
  title: "Tayyab - Full Stack Developer | React, Next.js, TypeScript Expert",
  description:
    "Professional Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. View portfolio, projects, and hire for web development services.",
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
    title: "Tayyab - Full Stack Developer | React, Next.js, TypeScript Expert",
    description:
      "Professional Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. View portfolio, projects, and hire for web development services.",
    siteName: "Tayyab Portfolio",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Tayyab - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tayyab - Full Stack Developer | React, Next.js, TypeScript Expert",
    description:
      "Professional Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: ["/banner.png"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/web-app-manifest-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8c5cff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Structured Data for Person/Developer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tayyab",
              jobTitle: "Full Stack Developer",
              description:
                "Professional Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies",
              url: "https://eviorcode.online",
              sameAs: [
                "https://github.com/yourgithub", // Replace with your GitHub
                "https://linkedin.com/in/yourlinkedin", // Replace with your LinkedIn
                "https://instagram.com/yourinstagram", // Replace with your Instagram
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Node.js",
                "Web Development",
                "Frontend Development",
                "Backend Development",
                "UI/UX Design",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance Developer",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${comicNeue.variable} antialiased`}
      >
        <ErrorBoundary>
          <Wrapper>
            {children}

            <Analytics />
          </Wrapper>

          <Toaster position="top-right" />
        </ErrorBoundary>
      </body>
    </html>
  );
}
