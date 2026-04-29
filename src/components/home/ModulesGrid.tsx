import Link from "next/link";

export default function ModulesGrid() {
  return (
    <section className="relative py-32">
      {" "}
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}{" "}
        <div className="max-w-850px">
          {" "}
          <span
            className="
           text-[11px]
           uppercase
           tracking-[0.3em]
           text-teal
         "
          >
            Platform Infrastructure{" "}
          </span>
          <h2
            className="
          mt-6
          text-[42px]
          leading-1
          tracking-[-0.04em]

          md:text-[72px]
        "
          >
            Connected fraud
            <span className="font-serif-display italic text-teal">
              {" "}
              intelligence modules.
            </span>
          </h2>
          <p
            className="
          mt-8
          max-w-[60ch]
          text-lg
          leading-[1.9]
          text-white/55
        "
          >
            TrustWork combines recruiter verification, phishing detection,
            anonymous reporting, infrastructure monitoring, and employer trust
            systems into a unified cybersecurity ecosystem.
          </p>
        </div>
        {/* Module Grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              number: "01",
              title: "Job Verification",
              href: "/verify",
              desc: "Analyze suspicious recruiters, fake onboarding portals, and phishing-based hiring workflows.",
              status: "ACTIVE",
              meta1: "14K+ domains analyzed",
              meta2: "Real-time verification",
            },
            {
              number: "02",
              title: "Community Reports",
              href: "/report",
              desc: "Monitor crowdsourced scam reports, recruiter impersonation campaigns, and fraud incidents.",
              status: "LIVE",
              meta1: "18K+ reports collected",
              meta2: "Community intelligence",
            },
            {
              number: "03",
              title: "Company Verification",
              href: "/companies",
              desc: "Validate employers using GST, CIN, and hiring infrastructure verification systems to flag fake recruiters.",
              status: "VERIFIED",
              meta1: "2.9K recruiters flagged",
              meta2: "Trust badge system",
            },
            {
              number: "04",
              title: "Threat Intelligence",
              href: "/threat-intel",
              desc: "Track phishing infrastructure, scam clusters, and fraudulent recruitment ecosystems across hiring platforms.",
              status: "MONITORING",
              meta1: "418 active campaigns",
              meta2: "Infrastructure analysis",
            },
            {
              number: "05",
              title: "Whistleblower Vault",
              href: "/whistleblower",
              desc: "Submit anonymous encrypted reports exposing internal fraud and hiring scam operations.",
              status: "ENCRYPTED",
              meta1: "Protected submissions",
              meta2: "Tokenized recovery",
            },
            {
              number: "06",
              title: "Admin Control",
              href: "/admin",
              desc: "Moderate fraud reports, approve employers, and manage platform intelligence systems through a secure admin dashboard.",
              status: "SECURED",
              meta1: "Threat moderation",
              meta2: "Operational oversight",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="
            group
            relative
            overflow-hidden

            rounded-[36px]
            border border-white/10
            bg-[#071018]

            p-8

            transition-all duration-500

            hover:border-var(--teal)/20
            hover:bg-[#09141f]
          "
            >
              {/* Hover Glow */}
              <div
                className="
              pointer-events-none
              absolute inset-0

              opacity-0
              transition-opacity duration-500

              group-hover:opacity-100
            "
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(43,191,179,0.08), transparent 45%)",
                }}
              />

              {/* Top Row */}
              <div className="relative z-10 flex items-start justify-between">
                <span
                  className="
                text-[11px]
                uppercase
                tracking-[0.25em]
                text-white/25
              "
                >
                  Module {item.number}
                </span>

                <div
                  className="
                rounded-full
                border border-var(--teal)/15
                bg-var(--teal)/10

                px-3 py-1

                text-[10px]
                uppercase
                tracking-[0.2em]
                text-teal
              "
                >
                  {item.status}
                </div>
              </div>

              {/* Title */}
              <h3
                className="
              relative z-10
              mt-14

              text-[34px]
              leading-[1.05]
              tracking-[-0.04em]
            "
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="
              relative z-10
              mt-6

              leading-[1.9]
              text-white/55
            "
              >
                {item.desc}
              </p>

              {/* Meta */}
              <div
                className="
              relative z-10
              mt-10

              flex flex-wrap gap-3
            "
              >
                {[item.meta1, item.meta2].map((meta) => (
                  <span
                    key={meta}
                    className="
                  rounded-full
                  border border-white/10
                  bg-white/0.03

                  px-3 py-1

                  text-xs
                  text-white/45
                "
                  >
                    {meta}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div
                className="
              relative z-10
              mt-12

              flex items-center justify-between
            "
              >
                <span className="text-sm text-teal">Open Module</span>

                <div
                  className="
    flex h-11 w-11
    items-center justify-center

    rounded-full
    border border-white/10

    transition-all duration-500

    group-hover:border-var(--teal)/20
    group-hover:bg-var(--teal)/10
  "
                >
                  <span
                    className="
    relative block

    rotate-[-35deg]
    transition-all duration-500 ease-out

    group-hover:rotate-0
  "
                  >
                  →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
