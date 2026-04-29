"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Reveal from "@/components/reveal/Reveal";

const items = [
  {
    title: "Fake Recruiter Detection",
    description:
      "Identify impersonated HR accounts, suspicious recruiter communication patterns, and fake interview workflows targeting job seekers.",
  },
  {
    title: "Phishing Infrastructure Analysis",
    description:
      "Analyze cloned company domains, phishing infrastructure, fake onboarding portals, and credential harvesting systems.",
  },
  {
    title: "Community Threat Intelligence",
    description:
      "Leverage community-submitted scam reports to detect recurring fraud campaigns before they spread across hiring platforms.",
  },
];

export default function ThreatIntel() {
  return (
    <Section className="relative section-fade">
      {" "}
      <Container>
        {" "}
        <div className="grid gap-20 lg:grid-cols-12">
          {/* Sticky Left Side */}{" "}
          <div className="lg:col-span-5">
            {" "}
            <div className="xl:sticky xl:top-32">
              {" "}
              <Reveal>
                {" "}
                <span
                  className="
                 text-[11px]
                 uppercase
                 tracking-[0.3em]
                 text-teal
               "
                >
                  Threat Intelligence{" "}
                </span>{" "}
              </Reveal>
              <Reveal delay={120}>
                <h2
                  className="
                mt-6
                text-[42px]
                leading-[0.95]
                tracking-[-0.04em]

                md:text-[72px]
              "
                >
                  Scam networks leave
                  <span className="font-serif-display italic text-teal">
                    {" "}
                    digital footprints.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={220}>
                <p
                  className="
                mt-8
                max-w-lg
                text-lg
                leading-[1.9]
                text-white/55
              "
                >
                  TrustWork continuously analyzes scam behaviour, suspicious
                  hiring infrastructure, phishing domains, recruiter
                  impersonation patterns, and community intelligence signals.
                </p>
              </Reveal>
            </div>
          </div>
          {/* Scrollable Right Side */}
          <div className="space-y-8 lg:col-span-7">
            {items.map((item, index) => (
              <Reveal key={item.title} delay={index * 100}>
                <div
                  className="
                group
                rounded-[36px]
                border border-white/10
                bg-white/[0.02]
                p-10
                transition-all duration-500
                hover:border-[var(--teal)]/20
                hover:bg-white/[0.03]
              "
                >
                  {/* Number */}
                  <span
                    className="
                  text-sm
                  tracking-[0.25em]
                  text-white/25
                "
                  >
                    0{index + 1}
                  </span>

                  {/* Title */}
                  <h3
                    className="
                  mt-8
                  text-[30px]
                  leading-tight
                "
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                  mt-6
                  max-w-[55ch]
                  leading-[1.9]
                  text-white/55
                "
                  >
                    {item.description}
                  </p>

                  {/* Bottom Accent */}
                  <div
                    className="
                  mt-10
                  h-px
                  w-0
                  bg-[var(--teal)]
                  transition-all duration-700
                  group-hover:w-full
                "
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
