import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Clean metadata without unsupported fields
export const metadata: Metadata = {
  title: "DevHub - GitHub Profile Finder",
  description: "Discover GitHub profiles and repositories with beautiful interface. Search users, explore projects, and analyze coding languages.",
  keywords: ["GitHub", "developer", "profile", "repositories", "coding", "programming"],
  authors: [{ name: "DevHub" }],
  creator: "DevHub",
  openGraph: {
    title: "DevHub - GitHub Profile Finder",
    description: "Discover GitHub profiles and repositories with beautiful interface",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevHub - GitHub Profile Finder",
    description: "Discover GitHub profiles and repositories",
  },
  manifest: '/site.webmanifest',
};

// Create viewport export separately (Next.js 14+ requirement)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3B82F6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
