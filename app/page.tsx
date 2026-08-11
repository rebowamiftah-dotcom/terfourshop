import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import RunningMarquee from "./components/RunningMarquee";
import FeaturedCategories from "./components/FeaturedCategories";
import FeaturedProducts from "./components/FeaturedProducts";
import FeaturesAndFlashSale from "./components/FeaturesAndFlashSale";
import ProblemSolution from "./components/ProblemSolution";
import Footer from "./components/Footer";




export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <HeroSection />     
      <RunningMarquee />
      <FeaturedCategories />
      <FeaturedProducts />
      <FeaturesAndFlashSale />
      <ProblemSolution  />
      <Footer />
    
      

      
      
    </main>
  );
}