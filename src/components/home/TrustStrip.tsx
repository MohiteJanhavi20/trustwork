export default function TrustStrip() {
const items = [
"Fake Offer Detection",
"Scam Company Intelligence",
"Community Verification",
"AI Threat Analysis",
"Cybercrime Awareness",
"Fraud Pattern Tracking",
"Recruiter Validation",
"Trust Signal Engine",
];

return ( <section className="relative overflow-hidden border-y border-white/5 py-6">
{/* Fade edges */} <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
  <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />

  {/* Marquee */}
  <div className="marquee-track">
    {[...items, ...items].map((item, index) => (
      <div
        key={index}
        className="
          flex items-center gap-5
          px-5 sm:px-8
          text-sm
          uppercase
          tracking-[0.18em]
          text-white/35
          whitespace-nowrap
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
        {item}
      </div>
    ))}
  </div>
</section>
);
}
