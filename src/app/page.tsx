import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SocialSidebar } from "@/components/social-sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <SocialSidebar />
      <main className="flex-1">
        <Hero />
        <div className="glow-line" aria-hidden="true" />
        <Projects />
        <div className="glow-line" aria-hidden="true" />
        <About />
        <Skills />
        <div className="glow-line" aria-hidden="true" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
