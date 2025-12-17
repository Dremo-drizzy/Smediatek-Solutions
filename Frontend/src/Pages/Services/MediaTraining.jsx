import ServiceHero from "../../Components/Servicespage/ServiceHero.jsx";
import AboutTraining from "../../Components/Servicespage/MediaTraining/AboutTraining/AboutTraining.jsx";
import Learn from "../../Components/Servicespage/MediaTraining/Learn/Learn.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/MediaTraining.css";
import TrainingCTA from "../../Components/Servicespage/MediaTraining/TrainingCTA/TrainingCTA.jsx";

function MediaTraining() {
  return (
    <div className="media-training-page">
      <ServiceHero
        title="Become a Professional Media Specialist"
        subtitle="Master livestreaming, video production, and digital media with our expert training programs."
        bgImage="https://png.pngtree.com/background/20210715/original/pngtree-high-tech-digital-technology-global-social-media-concept-picture-image_1264150.jpg"
      />

      <AboutTraining />
      <Learn />
      <TrainingCTA />
    </div>
  );
}

export default MediaTraining;
