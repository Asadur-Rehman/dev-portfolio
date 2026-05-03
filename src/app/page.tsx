import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/socials";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://asadurrehman.dev";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    description: personal.headline,
    email: personal.email,
    telephone: personal.phone,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "National University of Sciences and Technology (NUST), SEECS",
    },
    worksFor: {
      "@type": "Organization",
      name: "Aurora Solutions",
    },
    sameAs: socialLinks.map((s) => s.url),
    knowsAbout: [
      "Next.js", "React", "Node.js", "NestJS", "TypeScript", "Python",
      "MongoDB", "PostgreSQL", "OpenAI API", "RAG Architecture",
      "Full-Stack Development", "AI Integration",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
