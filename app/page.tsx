import HeroSection from "./components/HeroSection";
import HomeSections from "./components/HomeSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <HeroSection />
      <HomeSections />
    </main>
  );
}