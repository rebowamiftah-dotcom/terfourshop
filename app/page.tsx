import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

export default function HomePage() {
    return (
      <main className="min-h-screen bg-slate-950">
        <Navbar />
        <HeroSection />    
      </main>
    );
}
