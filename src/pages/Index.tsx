import HeroSection from "@/components/HeroSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import ThoughtLeadershipSection from "@/components/ThoughtLeadershipSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <OpenSourceSection />
      <ThoughtLeadershipSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
