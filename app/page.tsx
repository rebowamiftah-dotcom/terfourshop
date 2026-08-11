import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HomeSection from "./components/HomeSection";



export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <HeroSection />
      <HomeSection />
      

    </main>
  );
}