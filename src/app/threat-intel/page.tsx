
const threats = [
{
title: "Fake Infosys Recruiter Cluster",
category: "Recruiter Impersonation",
severity: "HIGH",
description:
"Multiple WhatsApp-based interview scams linked to impersonated Infosys HR accounts requesting onboarding payments.",
},
{
title: "Telegram Hiring Scam Network",
category: "Phishing Infrastructure",
severity: "CRITICAL",
description:
"Fraud campaign targeting fresh graduates through fake technical interview scheduling and credential harvesting workflows.",
},
{
title: "Cloned Wipro Careers Portal",
category: "Credential Harvesting",
severity: "HIGH",
description:
"Recently registered phishing domain imitating Wipro hiring infrastructure to collect applicant identity documents.",
},
];

const metrics = [
["Threat Campaigns Tracked", "418"],
["Scam Domains Monitored", "14K+"],
["Fake Recruiters Flagged", "2.9K"],
["Community Reports", "18K+"],
];

const categories = [
"Recruiter Impersonation",
"Phishing Infrastructure",
"Credential Harvesting",
"Fake Onboarding Systems",
"Payment Fraud Campaigns",
"Telegram Scam Networks",
];

export default function ThreatIntelPage() {
return ( <main className="relative min-h-screen overflow-hidden pt-36 text-white">
{/* Ambient Glow */}
<div
className="
pointer-events-none
absolute left-1/2 top-0
h-[500px] w-[1000px]
-translate-x-1/2
opacity-20 blur-[120px]
"
style={{
background:
"radial-gradient(circle, rgba(43,191,179,0.18) 0%, transparent 70%)",
}}
/>
  <div className="relative z-10 mx-auto max-w-7xl px-6">
    {/* Hero */}
    <div className="max-w-[950px]">
      <span
        className="
          text-[11px]
          uppercase
          tracking-[0.3em]
          text-teal
        "
      >
        Threat Intelligence Infrastructure
      </span>

      <h1
        className="
          mt-6
          text-[52px]
          leading-[0.95]
          tracking-[-0.04em]

          md:text-[96px]
        "
      >
        Monitoring live
        <span className="font-serif-display italic text-teal">
          {" "}
          recruitment fraud
        </span>{" "}
        ecosystems.
      </h1>

      <p
        className="
          mt-8
          max-w-[65ch]
          text-lg
          leading-[1.9]
          text-white/55
        "
      >
        TrustWork analyzes scam infrastructure, phishing
        domains, recruiter impersonation campaigns, and
        fraudulent onboarding systems targeting Indian
        students and job seekers.
      </p>
    </div>

    {/* Metrics */}
    <div className="mt-24 grid gap-6 md:grid-cols-4">
      {metrics.map(([label, value]) => (
        <div
          key={label}
          className="
            rounded-[32px]
            border border-white/10
            bg-white/[0.03]
            p-8
            shadow-[0_0_40px_rgba(0,0,0,0.15)]
          "
        >
          <span className="text-sm text-white/40">
            {label}
          </span>

          <h2 className="mt-5 text-5xl text-teal">
            {value}
          </h2>
        </div>
      ))}
    </div>

    {/* Main Grid */}
    <div className="mt-32 grid gap-10 lg:grid-cols-12">
      {/* Threat Feed */}
      <div className="lg:col-span-8">
        <div className="flex items-center justify-between">
          <div>
            <span
              className="
                text-[11px]
                uppercase
                tracking-[0.25em]
                text-teal
              "
            >
              Live Threat Feed
            </span>

            <h2 className="mt-4 text-4xl">
              Active fraud campaigns
            </h2>
          </div>

          <div
            className="
              rounded-full
              border border-[var(--teal)]/20
              bg-[var(--teal)]/10
              px-4 py-2
              text-xs
              uppercase
              tracking-[0.2em]
              text-teal
            "
          >
            Monitoring Active
          </div>
        </div>

        <div className="mt-12 space-y-8">
          {threats.map((threat) => (
            <div
              key={threat.title}
              className="
                rounded-[36px]
                border border-white/10
                bg-white/[0.03]
                p-8
                shadow-[0_0_40px_rgba(0,0,0,0.15)]
                transition-all duration-500
                hover:border-[var(--teal)]/20
              "
            >
              {/* Top */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.25em]
                      text-white/35
                    "
                  >
                    {threat.category}
                  </span>

                  <h3 className="mt-3 text-3xl leading-tight">
                    {threat.title}
                  </h3>
                </div>

                <div
                  className={`
                    rounded-full
                    px-4 py-2
                    text-xs
                    uppercase
                    tracking-[0.2em]

                    ${
                      threat.severity === "CRITICAL"
                        ? "bg-red-500/15 text-red-300"
                        : "bg-yellow-500/10 text-yellow-200"
                    }
                  `}
                >
                  {threat.severity}
                </div>
              </div>

              {/* Description */}
              <p
                className="
                  mt-8
                  max-w-[75ch]
                  leading-[1.9]
                  text-white/55
                "
              >
                {threat.description}
              </p>

              {/* Indicators */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Phishing Detected",
                  "Infrastructure Linked",
                  "Community Reports",
                  "Active Monitoring",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="
                      rounded-full
                      border border-white/10
                      bg-white/[0.03]
                      px-3 py-1
                      text-xs
                      text-white/45
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Panel */}
      <div className="space-y-6 lg:col-span-4">
        {/* Categories */}
        <div
          className="
            rounded-[32px]
            border border-white/10
            bg-white/[0.03]
            p-8
            shadow-[0_0_40px_rgba(0,0,0,0.15)]
          "
        >
          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-white/35
            "
          >
            Threat Categories
          </span>

          <div className="mt-8 space-y-4">
            {categories.map((item) => (
              <div
                key={item}
                className="
                  flex items-center gap-4
                  border-b border-white/5
                  pb-4
                "
              >
                <div
                  className="
                    h-2 w-2
                    rounded-full
                    bg-[var(--teal)]
                  "
                />

                <span className="text-white/55">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure */}
        <div
          className="
            rounded-[32px]
            border border-white/10
            bg-white/[0.03]
            p-8
            shadow-[0_0_40px_rgba(0,0,0,0.15)]
          "
        >
          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-white/35
            "
          >
            Infrastructure Analysis
          </span>

          <div className="mt-8 space-y-6">
            {[
              ["Average Domain Age", "5 Days"],
              ["Telegram Scam Clusters", "38"],
              ["Host Reputation Confidence", "92%"],
              ["Fraud Correlation Score", "HIGH"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between"
              >
                <span className="text-white/45">
                  {label}
                </span>

                <span className="text-teal">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Note */}
        <div
          className="
            rounded-[32px]
            border border-[var(--teal)]/15
            bg-[var(--teal)]/5
            p-8
          "
        >
          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-teal
            "
          >
            Intelligence Notice
          </span>

          <p
            className="
              mt-6
              leading-[1.9]
              text-white/65
            "
          >
            Threat intelligence data is continuously updated
            using community reports, infrastructure analysis,
            phishing detection workflows, and recruiter
            behaviour monitoring systems.
          </p>
        </div>
      </div>
    </div>
  </div>
</main>
);
}
