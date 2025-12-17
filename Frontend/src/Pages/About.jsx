import "../css/About.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";
import ServiceHero from "../Components/Servicespage/ServiceHero";
import AboutCTA from "../Components/Aboutpage/AboutCTA/AboutCTA";
import Mission from "../Components/Aboutpage/Mission-Vission/Mission";
import CoreValues from "../Components/Aboutpage/CoreValues/CoreValues";
import OurTeam from "../Components/Aboutpage/OurTeam/OurTeam";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="about">
      <ServiceHero
        title="About SmediaTek Solutions."
        subtitle="We're a passionate team of creators, strategists, and storytellers who are dedicated to transforming the digital landscape. We help brands connect with their audiences through cutting-edge content, strategic marketing, and immersive experiences."
        bgImage="https://cdn.pixabay.com/photo/2021/03/29/12/16/stairs-6133971_1280.jpg"
      />

      <OurTeam/>

      <div className="black">
        <Mission />
      </div>
      
      <CoreValues />
      
      <AboutCTA />
      
    </div>
  );
}

export default About;
