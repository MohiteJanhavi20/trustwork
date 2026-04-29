"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Reveal from "@/components/reveal/Reveal";
import Link from "next/link";

export default function Hero() {
  return (
    <Section className="relative overflow-hidden pt-32 sm:pt-36 md:pt-44 lg:pt-48">
      {/* Ambient Background */}
      <div
        className="
pointer-events-none
absolute left-1/2 top-0
h-[700px] w-[1100px]
-translate-x-1/2
opacity-20 blur-[100px]
"
        style={{
          background:
            "radial-gradient(circle, rgba(43,191,179,0.28) 0%, transparent 70%)",
        }}
      />
      {/* Grid Overlay */}
      <div
        className="
      pointer-events-none
      absolute inset-0
      opacity-[0.05]
    "
        style={{
          backgroundImage: `
        linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
      `,
          backgroundSize: "120px 120px",
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-[1200px] text-center lg:-translate-y-4">
          {/* Eyebrow */}
          <Reveal>
            <span
              className="
            inline-block
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-teal
          "
            >
              INDIA · JOB FRAUD INTELLIGENCE
            </span>
          </Reveal>

          {/* Heading */}
          <Reveal delay={120}>
            <h1
              className="
            mt-8
            text-[46px]
            leading-[0.92]
            tracking-[-0.05em]

            sm:text-[62px]
            md:text-[88px]
            lg:text-[120px]
            xl:text-[138px]
          "
            >
              Verify
              <br />
              <span
className="
relative inline-flex items-center

```
overflow-hidden

rounded-[28px]
border border-[var(--teal)]/20

bg-[rgba(43,191,179,0.05)]

px-8 py-2

font-serif-display
italic
text-teal

shadow-[0_0_40px_rgba(43,191,179,0.06)]
```

"

>

{/* Ambient Glow */}
<span
className="
pointer-events-none
absolute inset-0

  bg-[radial-gradient(circle_at_center,rgba(43,191,179,0.12),transparent_75%)]
"
/>

{/* Inner Grid */}
<span
className="
pointer-events-none
absolute inset-0
opacity-[0.08]
"
style={{
backgroundImage: `         linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
      `,
backgroundSize: "24px 24px",
}}
/>

  <span className="relative z-10">
    Before
  </span>
</span>

              <br />
              You Apply.
            </h1>
          </Reveal>

          {/* Subtext */}
          <Reveal delay={240}>
            <p
              className="
            mx-auto mt-10
            max-w-[850px]

            text-base
            leading-[1.9]
            text-white/55

            sm:text-lg
            md:text-[22px]
          "
            >
              A cyber-safety platform that helps job seekers identify scam recruiters, fake job portals, cloned company websites, and phishing-based hiring fraud in real time.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={320}>
            <div className="mt-16 flex justify-center">
              <Link
                href="/verify"
                className="
    group
    relative
    overflow-hidden

    rounded-full
    border border-[var(--teal)]/20
    bg-[rgba(43,191,179,0.08)]

    px-8 py-4
    sm:px-10 sm:py-5

    text-base
    font-medium
    text-teal

    transition-all duration-500

    hover:border-[var(--teal)]/40
    hover:bg-[rgba(43,191,179,0.14)]
  "
              >
                <span className="relative z-10">Start Verification →</span>
              </Link>
            </div>
          </Reveal>

          {/* Trust Signals */}
          <Reveal delay={420}>
            <div
              className="
            mt-10
            flex flex-wrap
            items-center
            justify-center
            gap-6

            text-sm
            text-white/35
          "
            >
              <span>14K+ Scam Domains Flagged</span>

              <span className="hidden sm:block text-white/15">•</span>

              <span>18K+ Community Reports</span>

              <span className="hidden sm:block text-white/15">•</span>

              <span>Real-Time Threat Intelligence</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
