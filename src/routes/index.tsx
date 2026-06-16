import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import {
  About,
  Features,
  HowItWorks,
  Stats,
  Benefits,
  Testimonials,
  FAQ,
  CTA,
  Footer,
} from "@/components/landing/Sections";
import { MouseGlow } from "@/components/landing/MouseGlow";
import { LoadingScreen } from "@/components/landing/LoadingScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Internify — Rekomendasi Magang Berbasis AI untuk Mahasiswa" },
      { name: "description", content: "Platform rekomendasi magang berbasis AI yang membantu mahasiswa menemukan peluang magang sesuai keterampilan, minat, dan tujuan karier." },
      { property: "og:title", content: "Internify — Rekomendasi Magang Berbasis AI" },
      { property: "og:description", content: "Temukan magang yang tepat untuk masa depanmu dengan teknologi AI." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <LoadingScreen />
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Stats />
        <Benefits />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
