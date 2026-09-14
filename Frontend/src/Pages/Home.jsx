import WhySmediaTek from "../Components/Homepage/WhySmediaTek/WhySmediaTek";
import ImpactHighlights from "../Components/Homepage/ImpactHighlights/ImpactHighlights";
import OurServices from "../Components/Homepage/OurServices/OurServices";
import CTA from "../Components/Homepage/CTA/CTA";
import "../css/Home.css";
import Hero from "../Components/Homepage/Hero/Hero";
import Marquee from "../Components/Homepage/Marquee/Marquee";
import Growth from "../Components/Homepage/Growth/Growth";

function Home() {
  return (
    <div className="homepage-wrapper">
      <Hero />
      <Marquee />
      <Growth />
      <ImpactHighlights />
      <OurServices />
      <WhySmediaTek />
      <CTA />
    </div>
  );
}

export default Home;
