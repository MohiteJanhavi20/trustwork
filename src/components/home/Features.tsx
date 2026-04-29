"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Reveal from "@/components/reveal/Reveal";

const features = [
{
number: "01",
title: "Verify Job Offers",
description:
"Verify suspicious recruiter emails, interview links, offer letters, and onboarding requests before sharing personal information.",
},
{
number: "02",
title: "Community Scam Reports",
description:
"Explore scam reports submitted by students and professionals to identify recurring fraud tactics and fake hiring operations.",
},
{
number: "03",
title: "Fraud Pattern Intelligence",
description:
"Detect cloned company domains, impersonated HR accounts, phishing workflows, and suspicious recruitment behaviour patterns.",
},
];

export default function Features() {
return ( <Section className="section-fade" > <Container>
{/* Section Header */} <Reveal> <div className="max-w-[700px]"> <span
           className="
             text-[11px]
             uppercase
             tracking-[0.3em]
             text-white/40
           "
         >
Platform Capabilities </span>
        <h2
          className="
            mt-6
            text-[42px]
            leading-[1]
            tracking-[-0.04em]

            md:text-[72px]
          "
        >
          Built to expose
          <span className="font-serif-display italic text-teal">
            {" "}
            fake hiring
          </span>{" "}
          ecosystems.
        </h2>
      </div>
    </Reveal>

    {/* Features Grid */}
    <div className="mt-24 grid gap-8 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Reveal key={feature.title} delay={index * 120}>
          <div
            className="
              group
              relative
              h-full
              rounded-[32px]
              border border-white/10
              bg-white/[0.02]
              p-6 sm:p-8
              transition-all duration-500
              hover:border-[var(--teal)]/20
              hover:-translate-y-1
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
              {feature.number}
            </span>

            {/* Title */}
            <h3
              className="
                mt-8
                text-2xl
                leading-tight
              "
            >
              {feature.title}
            </h3>

            {/* Description */}
            <p
              className="
                mt-5
                leading-[1.9]
                text-white/55
              "
            >
              {feature.description}
            </p>

            {/* Bottom Accent */}
            <div
              className="
                absolute bottom-0 left-0
                h-px w-0
                bg-[var(--teal)]
                transition-all duration-700
                group-hover:w-full
              "
            />
          </div>
        </Reveal>
      ))}
    </div>
  </Container>
</Section>
);
}
