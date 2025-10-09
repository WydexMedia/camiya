import Header from "./components/Header";
import NavCategories from "./components/NavCategories";
import ModernHero from "./components/ModernHero";
import FeaturesSection from "./components/FeaturesSection";
import CategoryGallery from "./components/CategoryGallery";
import BrandStory from "./components/BrandStory";
import NewArrivals from "./components/NewArrivals";
import VideoShowcase from "./components/VideoShowcase";
import CTABanner from "./components/CTABanner";
import TopDemanded from "./components/TopDemanded";
import LuxuryExperience from "./components/LuxuryExperience";
import Testimonials from "./components/Testimonials";
import InstagramFeed from "./components/InstagramFeed";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="font-sans bg-white text-gray-800">
      <Header />
      <NavCategories />
      <ModernHero />
      <FeaturesSection />
      <CategoryGallery />
      <BrandStory />
      <NewArrivals />
      <VideoShowcase />
      <TopDemanded />
      <CTABanner />
      <LuxuryExperience />
      <Testimonials />
      <InstagramFeed />
      <Footer />
    </div>
  );
}
