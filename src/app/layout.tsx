import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { personal } from "@/data/personal";
import { siteUrl } from "@/lib/site";
import { colorModeInitScript } from "@/lib/theme";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrlResolved = siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrlResolved),
  title: {
    default: `${personal.name} — ${personal.title}`,
    template: `%s — ${personal.name}`,
  },
  description: `${personal.headline} ${personal.subhead}`,
  keywords: [
    "Asad ur Rehman",
    "Software Engineer",
    "Full-Stack Developer",
    "AI Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "MERN Stack",
    "NUST SEECS",
    "Aurora Solutions",
    "Pakistan",
    "Remote Software Engineer",
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrlResolved,
    siteName: personal.name,
    title: `${personal.name} — ${personal.title}`,
    description: personal.headline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.title}`,
    description: personal.headline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d11" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: colorModeInitScript }} />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-background focus:font-medium"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
