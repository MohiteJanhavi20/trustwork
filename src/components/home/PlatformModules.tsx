"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Reveal from "@/components/reveal/Reveal";

const modules = [
{
number: "01",
title: "Job Seeker Module",
description:
"OTP-based onboarding with multilingual fraud verification designed for first-time smartphone users.",
},
{
number: "02",
title: "Community Report Module",
description:
"Users submit scam evidence, screenshots, and recruiter behaviour reports to strengthen community intelligence.",
},
{
number: "03",
title: "Company Verification Module",
description:
"Employers verify GST or CIN credentials and receive TrustWork verification badges visible to all users.",
},
{
number: "04",
title: "Threat Intelligence Module",
description:
"Phone reputation analysis, EXIF forensics, phishing detection, fraud clustering, and scam infrastructure analysis.",
},
{
number: "05",
title: "Admin Control Module",
description:
"Moderation systems for reviewing reports, approving verifications, blocking offenders, and intelligence monitoring.",
},
{
number: "06",
title: "Whistleblower Vault",
description:
"Anonymous encrypted reporting system using private recovery tokens with identity isolation from platform administrators.",
},
];

export default function PlatformModules() {
return ( <Section className="section-fade"> <Container>
{/* Heading */} <div className="max-w-[900px]"> <Reveal> <span
           className="
             text-[11px]
             uppercase
             tracking-[0.3em]
             text-teal
           "
         >
Platform Architecture </span> </Reveal>
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
          Built as a
          <span className="font-serif-display italic text-teal">
            {" "}
            multi-layer fraud intelligence
          </span>{" "}
          ecosystem.
        </h2>
      </Reveal>
    </div>

    {/* Modules Grid */}
    <div className="mt-24 grid gap-px overflow-hidden rounded-[36px] border border-white/10 bg-white/10 lg:grid-cols-2">
      {modules.map((module, index) => (
        <Reveal key={module.title} delay={index * 80}>
          <div
            className="
              group
              relative
              h-full
              bg-[#050816]
              p-8 sm:p-10
              transition-all duration-500
              hover:bg-white/[0.02]
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
              {module.number}
            </span>

            {/* Title */}
            <h3
              className="
                mt-8
                text-[28px]
                leading-tight
              "
            >
              {module.title}
            </h3>

            {/* Description */}
            <p
              className="
                mt-6
                max-w-[50ch]
                leading-[1.9]
                text-white/55
              "
            >
              {module.description}
            </p>

            {/* Hover Accent */}
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
