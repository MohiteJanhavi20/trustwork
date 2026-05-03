"use client";

import Container from "@/components/layout/Container";
import Link from "next/link";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Job Verification",
    href: "/verify",
  },
  {
    label: "Threat Intelligence",
    href: "/threat-intel",
  },
  {
    label: "Community Reports",
    href: "/report",
  },
  {
    label: "Company Verification",
    href: "/companies",
  },
  {
    label: "Whistleblower Vault",
    href: "/whistleblower",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-20">
      {/* Ambient Background */}
      <div
        className="
pointer-events-none
absolute inset-0
opacity-[0.04]
"
        style={{
          backgroundImage: `             linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
      <Container className="relative z-10">
        {/* Top Row */}
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <span
              className="
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-teal
          "
            >
              TRUSTWORK PLATFORM
            </span>

            <h2
              className="
            mt-6
            text-[42px]
            leading-[0.95]
            tracking-[-0.04em]

            md:text-[64px]
          "
            >
              India’s next-generation
              <span
                className="
relative inline-flex items-center

```
overflow-hidden

rounded-xl
border border-[var(--teal)]/15

bg-[rgba(43,191,179,0.05)]

px-3 py-1
```

"
              >
                <span
                  className="
absolute inset-0 opacity-[0.08]
"
                  style={{
                    backgroundImage: `         linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
      `,
                    backgroundSize: "18px 18px",
                  }}
                />

                <span className="relative z-10">fraud intelligence</span>
              </span>{" "}
              platform.
            </h2>

            <p
              className="
            mt-8
            max-w-[55ch]
            leading-[1.9]
            text-white/55
          "
            >
              Designed to protect students and job seekers from fake recruiters,
              phishing-based hiring scams, cloned company domains, and
              fraudulent onboarding workflows.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-7">
            <div className="grid gap-y-6 sm:grid-cols-2">
              {links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="
                group
                flex items-center gap-4
                border-b border-white/5
                pb-4
              "
                >
                  <div
                    className="
                  h-1.5 w-1.5
                  rounded-full
                  bg-[var(--teal)]

                  transition-all duration-300

                  group-hover:scale-150
                "
                  />

                  <span
                    className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-white/40

                  transition-colors duration-300

                  group-hover:text-white/80
                "
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div
          className="
        mt-20
        flex flex-col gap-6
        border-t border-white/5
        pt-8

        md:flex-row
        md:items-center
        md:justify-between
      "
        >
          {/* Credits */}
          <div className="text-sm text-white/35">
            TrustWork © 2025 · TYBCA Cybersecurity Project
          </div>

          {/* Team */}
          <div
            className="
          flex flex-wrap items-center gap-6
          text-sm text-white/35
        "
          >
            <span className="text-white/15">•</span>

            <span>Built by Vinay Thorat And Janhavi Mohite</span>
          </div>

          {/* Helpline */}
          <div
            className="
          rounded-full
          border border-white/10
          bg-white/[0.03]

          px-5 py-2

          text-xs
          uppercase
          tracking-[0.25em]
          text-white/45
        "
          >
            Cybercrime Helpline · 1930
          </div>
        </div>
      </Container>
    </footer>
  );
}
