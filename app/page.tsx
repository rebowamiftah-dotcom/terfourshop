import HeroSection from "./components/Home/HeroSection";
import RunningMarquee from "./components/Home/RunningMarquee";
import FeaturedCategories from "./components/Home/FeaturedCategories";
import FeaturedProducts from "./components/Home/FeaturedProducts";
import FeaturesAndFlashSale from "./components/Home/FeaturesAndFlashSale";
import ProblemSolution from "./components/Home/ProblemSolution";
import Footer from "./components/Footer";




export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
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