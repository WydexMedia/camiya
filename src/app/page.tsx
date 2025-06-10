import Header from "./components/Header";
import NavCategories from "./components/NavCategories";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ShopOnBudget from "./components/ShopOnBudget";
import NewArrivals from "./components/NewArrivals";
import TopDemanded from "./components/TopDemanded";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="font-sans bg-white text-gray-800">
      <Header />
      <NavCategories />
      <HeroSection />
      <FeaturesSection />
      <ShopOnBudget />
      <NewArrivals />
      <TopDemanded />
      <Footer />
    </div>
  );
}
