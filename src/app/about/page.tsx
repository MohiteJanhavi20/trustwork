const stats = [
{
label: "Fraud Reports Analyzed",
value: "18K+",
},
{
label: "Fake Recruiters Flagged",
value: "2.9K",
},
{
label: "Scam Domains Detected",
value: "14K+",
},
];

const modules = [
"Job Verification Engine",
"Community Scam Reports",
"Company Trust Verification",
"Threat Intelligence Infrastructure",
"Whistleblower Protection System",
"Administrative Moderation Layer",
];

export default function AboutPage() {
return ( <main className="relative min-h-screen overflow-hidden pt-36 text-white">
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
        About TrustWork
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
        Building safer
        <span className="font-serif-display italic text-teal">
          {" "}
          digital hiring
        </span>{" "}
        ecosystems for India.
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
        TrustWork is a community-powered fraud intelligence
        platform designed to help students, fresh graduates,
        and job seekers identify fake recruiters, phishing
        campaigns, suspicious hiring portals, and fraudulent
        onboarding workflows before financial or identity loss
        occurs.
      </p>
    </div>

    {/* Stats */}
    <div className="mt-24 grid gap-6 md:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="
            rounded-[32px]
            border border-white/10
            bg-white/[0.03]
            p-8
            shadow-[0_0_40px_rgba(0,0,0,0.15)]
          "
        >
          <span className="text-sm text-white/40">
            {item.label}
          </span>

          <h2 className="mt-5 text-5xl text-teal">
            {item.value}
          </h2>
        </div>
      ))}
    </div>

    {/* Why TrustWork Exists */}
    <div className="mt-32 grid gap-16 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <span
          className="
            text-[11px]
            uppercase
            tracking-[0.25em]
            text-teal
          "
        >
          Why TrustWork Exists
        </span>
      </div>

      <div className="lg:col-span-8">
        <p
          className="
            text-[24px]
            leading-[1.7]
            text-white/75
          "
        >
          Thousands of Indian students and job seekers are
          targeted every month through fake HR recruiters,
          phishing-based onboarding portals, cloned company
          websites, WhatsApp interview scams, and fraudulent
          verification workflows requesting payments or
          sensitive personal documents.
        </p>

        <p
          className="
            mt-8
            leading-[1.9]
            text-white/55
          "
        >
          TrustWork was designed as a multi-layer fraud
          intelligence platform capable of combining community
          reporting, recruiter verification, phishing
          detection, domain analysis, and cybersecurity-based
          threat monitoring into a unified protection
          ecosystem.
        </p>
      </div>
    </div>

    {/* Platform Modules */}
    <div className="mt-32">
      <div className="max-w-[700px]">
        <span
          className="
            text-[11px]
            uppercase
            tracking-[0.25em]
            text-teal
          "
        >
          Platform Infrastructure
        </span>

        <h2
          className="
            mt-6
            text-[42px]
            leading-[1]
            tracking-[-0.04em]

            md:text-[72px]
          "
        >
          A multi-module fraud intelligence ecosystem.
        </h2>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[36px] border border-white/10 bg-white/10 md:grid-cols-2">
        {modules.map((module, index) => (
          <div
            key={module}
            className="
              bg-[#050816]
              p-8
              transition-all duration-500
              hover:bg-white/[0.03]
            "
          >
            <span
              className="
                text-[11px]
                uppercase
                tracking-[0.25em]
                text-white/25
              "
            >
              0{index + 1}
            </span>

            <h3 className="mt-6 text-2xl">
              {module}
            </h3>
          </div>
        ))}
      </div>
    </div>

    {/* Team */}
    <div
      className="
        mt-32
        rounded-[36px]
        border border-white/10
        bg-white/[0.03]
        p-10
        shadow-[0_0_40px_rgba(0,0,0,0.15)]
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
        Project Team
      </span>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-3xl">
            Vinay Thorat
          </h3>

          <p className="mt-4 leading-[1.9] text-white/55">
            Frontend architecture, user experience design,
            platform interactions, and system presentation.
          </p>
        </div>

        <div>
          <h3 className="text-3xl">
            Janhavi Mohite
          </h3>

          <p className="mt-4 leading-[1.9] text-white/55">
            Cybersecurity workflows, fraud analysis logic,
            threat intelligence research, and reporting
            systems.
          </p>
        </div>
      </div>
    </div>

    {/* Helpline */}
    <div
      className="
        mt-20
        flex flex-wrap items-center justify-between gap-6
        border-t border-white/5
        py-10
      "
    >
      <div className="text-white/40">
        National Cybercrime Helpline
      </div>

      <div
        className="
          rounded-full
          border border-white/10
          bg-white/[0.03]
          px-5 py-2
          text-sm
          uppercase
          tracking-[0.2em]
          text-teal
        "
      >
        1930
      </div>
    </div>
  </div>
</main>
);
}
