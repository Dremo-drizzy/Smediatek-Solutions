import { useState, useEffect } from "react";
import ServiceHero from "../../Components/Servicespage/ServiceHero.jsx";
import PastStreams from "../../Components/Servicespage/Livestreaming/PastStreams.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../css/Livestreaming.css";
import WhyLivestreaming from "../../Components/Servicespage/Livestreaming/WhyLivestreaming/WhyLivestreaming.jsx";
import LiveCTASection from "../../Components/Servicespage/Livestreaming/LiveCTASection/LiveCTASection.jsx";

function Livestreaming() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="livestreaming-page">
      <ServiceHero
        title="Live Streaming"
        subtitle="Stream live events with seamless quality"
        bgImage="https://img.freepik.com/premium-photo/using-record-video-streamer-smart-broadcaster-host-channel-read-script-notes-viewers-while-doing-live-discussion-show-social-media_28914-55146.jpg?w=2000"
      />
      <PastStreams /> 
      
      <WhyLivestreaming/>
      
      <LiveCTASection/>
    </div>
  );
}

export default Livestreaming;
