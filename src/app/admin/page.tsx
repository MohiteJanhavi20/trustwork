"use client";

const reports = [
{
title: "Fake Infosys Recruiter",
severity: "HIGH",
status: "UNDER REVIEW",
},
{
title: "Telegram Scam Campaign",
severity: "CRITICAL",
status: "ESCALATED",
},
{
title: "Cloned Hiring Portal",
severity: "MEDIUM",
status: "MONITORING",
},
];

const metrics = [
["Pending Reports", "128"],
["Verified Companies", "418"],
["Threat Campaigns", "38"],
["Moderators Active", "12"],
];

export default function AdminPage() {
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
"radial-gradient(circle, rgba(43,191,179,0.16) 0%, transparent 70%)",
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
        Administrative Intelligence Layer
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
        Operational oversight for
        <span className="font-serif-display italic text-teal">
          {" "}
          fraud intelligence
        </span>{" "}
        systems.
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
        TrustWork administrators monitor threat campaigns,
        moderate community reports, verify employers,
        escalate phishing activity, and manage platform
        intelligence infrastructure.
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
            bg-[#071018]

            p-8

            transition-all duration-500
            hover:border-[var(--teal)]/20
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
    <div className="mt-24 grid gap-8 lg:grid-cols-12">
      {/* Threat Queue */}
      <div className="lg:col-span-8">
        <div
          className="
            rounded-[36px]
            border border-white/10
            bg-[#071018]

            p-8
          "
        >
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
                Moderation Queue
              </span>

              <h2 className="mt-4 text-4xl">
                Active threat investigations
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
              Live Monitoring
            </div>
          </div>

          <div className="mt-12 space-y-6">
            {reports.map((report) => (
              <div
                key={report.title}
                className="
                  rounded-[28px]
                  border border-white/10
                  bg-black/20

                  p-6
                "
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span
                      className="
                        text-[11px]
                        uppercase
                        tracking-[0.2em]
                        text-white/30
                      "
                    >
                      Fraud Investigation
                    </span>

                    <h3 className="mt-3 text-2xl">
                      {report.title}
                    </h3>
                  </div>

                  <div className="flex gap-3">
                    <div
                      className="
                        rounded-full
                        border border-yellow-500/20
                        bg-yellow-500/10

                        px-3 py-1

                        text-[10px]
                        uppercase
                        tracking-[0.2em]
                        text-yellow-200
                      "
                    >
                      {report.severity}
                    </div>

                    <div
                      className="
                        rounded-full
                        border border-[var(--teal)]/15
                        bg-[var(--teal)]/10

                        px-3 py-1

                        text-[10px]
                        uppercase
                        tracking-[0.2em]
                        text-teal
                      "
                    >
                      {report.status}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "Threat Correlation",
                    "Community Signals",
                    "Infrastructure Scan",
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
      </div>

      {/* Side Panel */}
      <div className="space-y-6 lg:col-span-4">
        {/* Controls */}
        <div
          className="
            rounded-[32px]
            border border-white/10
            bg-[#071018]

            p-8
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
            Administrative Controls
          </span>

          <div className="mt-8 space-y-4">
            {[
              "Approve Company Verification",
              "Escalate Fraud Campaign",
              "Block Recruiter Identity",
              "Review Community Reports",
              "Monitor Threat Infrastructure",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex items-center justify-between

                  rounded-2xl
                  border border-white/10
                  bg-black/20

                  px-4 py-4

                  transition-all duration-300
                  hover:border-[var(--teal)]/20
                "
              >
                <span className="text-sm text-white/65">
                  {item}
                </span>

                <span className="text-teal">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
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
            Security Layer
          </span>

          <p
            className="
              mt-6
              leading-[1.9]
              text-white/65
            "
          >
            Administrative operations are protected through
            controlled moderation workflows, isolated
            intelligence review systems, and monitored
            escalation infrastructure.
          </p>
        </div>
      </div>
    </div>
  </div>
</main>
);
}
