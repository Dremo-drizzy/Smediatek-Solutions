import "./Marquee.css";

const ITEMS = [
  "Livestreaming",
  "Brand Identity",
  "Media Training",
  "Website Design",
  "Digital Marketing",
];

function MarqueeTrack() {
  return (
    <div className="marquee-track">
      {ITEMS.map((item) => (
        <span className="marquee-item" key={item}>
          {item} <span className="marquee-dot">&bull;</span>
        </span>
      ))}
    </div>
  );
}

function Marquee() {
  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        <MarqueeTrack />
        <MarqueeTrack aria-hidden="true" />
      </div>
    </div>
  );
}

export default Marquee;
