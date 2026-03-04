import type { Metadata } from "next";
import { Space_Mono, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Full-Stack Developer | MERN Stack Portfolio",
  description:
    "Building production web applications with Next.js, React & Node.js. Open to remote opportunities.",
  openGraph: {
    title: "Full-Stack Developer | MERN Stack Portfolio",
    description:
      "Building production web applications with Next.js, React & Node.js.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Developer | MERN Stack Portfolio",
    description: "Building production web applications with Next.js, React & Node.js.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
