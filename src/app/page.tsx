import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Metrics } from "@/components/Metrics";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Experience } from "@/components/Experience";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/ui/PageLoader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ShortcutsHelp } from "@/components/ui/ShortcutsHelp";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { EasterEgg } from "@/components/ui/EasterEgg";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/socials";
import { fetchLatestActivity } from "@/lib/github";

export default async function Home() {
  const liveActivity = await fetchLatestActivity();
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
      <CustomCursor />
      <CommandPalette />
      <ShortcutsHelp />
      <EasterEgg />
      <PageLoader>
        <Header />
        <ScrollRail />
        <main id="main-content">
          <Hero liveActivity={liveActivity} />
          <Metrics />
          <About />
          <TechStack />
          <Projects />
          <Process />
          <Services />
          <Testimonials />
          <Experience />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </PageLoader>
    </>
  );
}
