"use client";

import { useState } from "react";
const companies = [
{
name: "Infosys",
status: "VERIFIED",
type: "Enterprise Hiring Partner",
},
{
name: "TCS",
status: "VERIFIED",
type: "Technology Recruitment",
},
{
name: "Wipro",
status: "MONITORED",
type: "Corporate Hiring Infrastructure",
},
];

export default function CompaniesPage() {
const [query, setQuery] = useState("");
const [result, setResult] = useState<any>(null);
const [loading, setLoading] = useState(false);

const verifyCompany = async () => {

  if (!query.trim()) return;

  try {

    setLoading(true);

    const response = await fetch(
      `http://127.0.0.1:8000/api/check-company?company=${query}&domain=${query}&gst=${query}`
    );

    const data = await response.json();

    setResult(data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);
  }
};
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
    <div className="max-w-[900px]">
      <span
        className="
          text-[11px]
          uppercase
          tracking-[0.3em]
          text-teal
        "
      >
        Employer Verification Infrastructure
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
        Building trusted
        <span className="font-serif-display italic text-teal">
          {" "}
          hiring ecosystems
        </span>{" "}
        for job seekers.
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
        TrustWork enables employers to verify their
        recruitment identity using GST, CIN, and domain
        verification systems while helping students identify
        legitimate hiring infrastructure.
      </p>
    </div>

    {/* Verification Console */}
    <div
      className="
        mt-20
        rounded-[36px]
        border border-white/10
        bg-white/[0.03]
        p-8
      "
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter company name, GST number, or hiring domain"
          className="
            flex-1
            rounded-2xl
            border border-white/10
            bg-black/20

            px-5 py-4

            outline-none
            placeholder:text-white/20
  "
/>

        <button
        onClick={verifyCompany}
          className="
            rounded-2xl
            bg-[var(--teal)]

            px-8 py-4

            text-sm
            font-medium
            text-black

            transition-all duration-300
            hover:bg-[var(--teal-light)]
          "
        >
          {loading ? "Verifying..." : "Verify Company"}
        </button>
      </div>
    </div>
{result && (
  <div
    className="
      mt-10
      rounded-[32px]
      border border-white/10
      bg-[#071018]
      p-8
    "
  >
    <div className="flex items-center justify-between">

      <h2 className="text-3xl font-semibold">
        {result.status}
      </h2>

      <div
        className={`
          rounded-full px-4 py-2 text-sm font-medium

          ${
            result.risk_score >= 80
              ? "bg-red-500/20 text-red-400"
              : result.risk_score >= 30
              ? "bg-yellow-500/20 text-yellow-300"
              : "bg-green-500/20 text-green-400"
          }
        `}
      >
        Risk Score: {result.risk_score}
      </div>
    </div>

    <p className="mt-6 text-white/60 leading-[1.8]">
      {result.message}
    </p>

    {result.company && (
      <div className="mt-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-white/10 p-4">
          <p className="text-white/40 text-sm">
            Company
          </p>

          <h3 className="mt-2 text-xl">
            {result.company.name}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 p-4">
          <p className="text-white/40 text-sm">
            Domain
          </p>

          <h3 className="mt-2 text-xl">
            {result.company.domain}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 p-4">
          <p className="text-white/40 text-sm">
            GST
          </p>

          <h3 className="mt-2 text-xl">
            {result.company.gst}
          </h3>
        </div>

      </div>
    )}
  </div>
)}
    {/* Verified Companies */}
    <div className="mt-24">
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
            Verified Organizations
          </span>

          <h2 className="mt-4 text-4xl">
            Trusted hiring infrastructure
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
          Verification Active
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {companies.map((company) => (
          <div
            key={company.name}
            className="
              rounded-[32px]
              border border-white/10
              bg-[#071018]

              p-8

              transition-all duration-500
              hover:border-[var(--teal)]/20
            "
          >
            <div className="flex items-start justify-between">
              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  text-white/25
                "
              >
                Verified Entity
              </span>

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
                {company.status}
              </div>
            </div>

            <h3 className="mt-10 text-4xl">
              {company.name}
            </h3>

            <p
              className="
                mt-6
                leading-[1.9]
                text-white/55
              "
            >
              {company.type}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "GST Verified",
                "Domain Authenticated",
                "Recruitment Monitored",
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
</main>
);
}
