import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { personal } from "@/data/personal";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    description: personal.headline,
    email: personal.email,
    ...(siteUrl && { url: siteUrl }),
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
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
        <Footer />
      </main>
    </>
  );
}
