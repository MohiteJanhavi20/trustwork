"use client";

const reports = [
  {
    company: "Fake TCS Recruitment Portal",
    type: "Phishing Infrastructure",
    risk: "HIGH RISK",
    description:
      "Victims reported fake onboarding workflows requesting Aadhaar verification and laptop activation payments through Telegram.",
  },
  {
    company: "Infosys HR WhatsApp Scam",
    type: "Recruiter Impersonation",
    risk: "MEDIUM RISK",
    description:
      "Scammers impersonated Infosys recruiters using WhatsApp interview scheduling and document verification requests.",
  },
  {
    company: "Cloned Wipro Careers Domain",
    type: "Fake Hiring Portal",
    risk: "HIGH RISK",
    description:
      "Recently registered domain imitated official Wipro hiring pages and redirected applicants to credential harvesting forms.",
  },
];

export default function ReportPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-36 text-white">
      {/* Ambient Background */}
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
        {/* Heading */}
        <div className="max-w-[950px]">
          <span
            className="
          text-[11px]
          uppercase
          tracking-[0.3em]
          text-teal
        "
          >
            Community Intelligence Reports
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
            Crowdsourced fraud
            <span className="font-serif-display italic text-teal">
              {" "}
              intelligence
            </span>{" "}
            from real victims.
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
            TrustWork collects scam reports submitted by students, job seekers,
            and professionals to identify recurring fraud tactics, fake
            recruiters, phishing workflows, and suspicious hiring
            infrastructure.
          </p>
        </div>

        {/* Submit Report CTA */}
        <div
          className="
        mt-20
        rounded-[36px]
        border border-white/10
        bg-white/[0.03]
        p-8
        shadow-[0_0_40px_rgba(0,0,0,0.15)]
      "
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span
                className="
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-white/35
            "
              >
                Submit Intelligence
              </span>

              <h2 className="mt-5 text-3xl leading-tight">
                Report suspicious recruiters, domains, or onboarding scams.
              </h2>
            </div>

            <button
              className="
            rounded-full
            bg-[var(--teal)]
            px-8 py-4
            text-sm font-medium
            text-black
            transition-all duration-300
            hover:bg-[var(--teal-light)]
          "
            >
              Submit Scam Report
            </button>
          </div>
        </div>

        {/* Reports */}
        <div className="mt-20 space-y-8">
          {reports.map((report, index) => (
            <div
              key={index}
              className="
            rounded-[36px]
            border border-white/10
            bg-white/[0.03]
            p-8
            shadow-[0_0_40px_rgba(0,0,0,0.15)]
            transition-all duration-500
            hover:border-[var(--teal)]/20
            hover:bg-white/[0.04]
          "
            >
              {/* Top Row */}
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
                    {report.type}
                  </span>

                  <h3 className="mt-3 text-3xl leading-tight">
                    {report.company}
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
                  report.risk === "HIGH RISK"
                    ? "bg-red-500/10 text-red-300"
                    : "bg-yellow-500/10 text-yellow-200"
                }
              `}
                >
                  {report.risk}
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
                {report.description}
              </p>

              {/* Bottom Row */}
              <div
                className="
              mt-10
              flex flex-wrap items-center gap-6
              border-t border-white/5
              pt-6
            "
              >
                {/* Votes */}
                <div className="flex items-center gap-3">
                  <button
                    className="
                  rounded-full
                  border border-white/10
                  px-4 py-2
                  text-sm
                  transition-all duration-300
                  hover:border-[var(--teal)]/30
                "
                  >
                    ↑ Useful
                  </button>

                  <button
                    className="
                  rounded-full
                  border border-white/10
                  px-4 py-2
                  text-sm
                  transition-all duration-300
                  hover:border-red-500/30
                "
                  >
                    ↓ False
                  </button>
                </div>

                {/* Meta */}
                <div className="text-sm text-white/35">
                  Reported 3 hours ago · Verified by 28 users
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
